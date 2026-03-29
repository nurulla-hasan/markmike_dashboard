import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { Stage, Layer, Image as KonvaImage, Text, Transformer, Rect } from "react-konva";
import Konva from "konva";
import type { ToolType } from "./ProductEditor";

export interface CanvasObject {
  id: string;
  type: "image" | "text";
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  // Image
  image?: HTMLImageElement;
  src?: string;
  // Text
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
}

interface KonvaCanvasProps {
  activeTool: ToolType;
  productImage: string;
  uploadedFile: File | null;
  selectedId: string | null;
  onSelectChange: (id: string | null) => void;
  onObjectsChange?: (objects: CanvasObject[]) => void;
  onImageUpload?: (file: File) => void;
  placeTextRequest?: { id: string; text?: string } | null;
  onPlaceTextConsumed?: () => void;
}

export function KonvaCanvas({ 
  activeTool: _activeTool, 
  productImage, 
  uploadedFile, 
  selectedId: externalSelectedId,
  onSelectChange,
  onObjectsChange, 
  onImageUpload,
  placeTextRequest,
  onPlaceTextConsumed,
}: KonvaCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  void _activeTool;
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>({
    width: 600,
    height: 700,
  });
  const [isPositioning, setIsPositioning] = useState(false);

  // Use external selectedId if provided, otherwise use internal
  const currentSelectedId = externalSelectedId !== undefined ? externalSelectedId : selectedId;

  // Load background product image
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = productImage;
    img.onload = () => {
      setBgImage(img);
    };
  }, [productImage]);

  // Keep stage size in sync with container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      setStageSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    };

    update();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    } else {
      window.addEventListener("resize", update);
    }

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const bgPlacement = useMemo(() => {
    const stageW = stageSize.width;
    const stageH = stageSize.height;
    if (!bgImage) {
      return {
        x: stageW / 2,
        y: stageH / 2,
        width: stageW,
        height: stageH,
        offsetX: stageW / 2,
        offsetY: stageH / 2,
      };
    }

    const scale = Math.min(stageW / bgImage.width, stageH / bgImage.height);
    const w = bgImage.width * scale;
    const h = bgImage.height * scale;

    return {
      x: stageW / 2,
      y: stageH / 2,
      width: w,
      height: h,
      offsetX: w / 2,
      offsetY: h / 2,
    };
  }, [bgImage, stageSize.height, stageSize.width]);

  const zones = useMemo(() => {
    const imgLeft = bgPlacement.x - bgPlacement.offsetX;
    const imgTop = bgPlacement.y - bgPlacement.offsetY;

    const view = productImage.toLowerCase();

    if (view.includes("back")) {
      const back = {
        x: imgLeft + bgPlacement.width * 0.22,
        y: imgTop + bgPlacement.height * 0.18,
        width: bgPlacement.width * 0.56,
        height: bgPlacement.height * 0.60,
      };
      return { primary: back };
    }

    if (view.includes("l sleeve") || view.includes("left sleeve")) {
      const sleeve = {
        x: imgLeft + bgPlacement.width * 0.42,
        y: imgTop + bgPlacement.height * 0.22,
        width: bgPlacement.width * 0.18,
        height: bgPlacement.height * 0.58,
      };
      return { primary: sleeve };
    }

    if (view.includes("r sleeve") || view.includes("right sleeve")) {
      const sleeve = {
        x: imgLeft + bgPlacement.width * 0.40,
        y: imgTop + bgPlacement.height * 0.22,
        width: bgPlacement.width * 0.18,
        height: bgPlacement.height * 0.58,
      };
      return { primary: sleeve };
    }

    const front = {
      x: imgLeft + bgPlacement.width * 0.26,
      y: imgTop + bgPlacement.height * 0.33,
      width: bgPlacement.width * 0.26,
      height: bgPlacement.height * 0.26,
    };

    const leftChest = {
      x: imgLeft + bgPlacement.width * 0.57,
      y: imgTop + bgPlacement.height * 0.34,
      width: bgPlacement.width * 0.14,
      height: bgPlacement.height * 0.14,
    };

    return { primary: front, secondary: leftChest };
  }, [bgPlacement.offsetX, bgPlacement.offsetY, bgPlacement.height, bgPlacement.width, bgPlacement.x, bgPlacement.y, productImage]);

  const clampToRect = useCallback(
    (pos: { x: number; y: number }, rect: { x: number; y: number; width: number; height: number }, objW: number, objH: number) => {
      const halfW = objW / 2;
      const halfH = objH / 2;
      return {
        x: Math.max(rect.x + halfW, Math.min(pos.x, rect.x + rect.width - halfW)),
        y: Math.max(rect.y + halfH, Math.min(pos.y, rect.y + rect.height - halfH)),
      };
    },
    []
  );

  const clampNodeToZone = useCallback(
    (node: Konva.Node) => {
      const rect = zones.primary;
      if (!rect) return;

      const client = node.getClientRect({ relativeTo: stageRef.current ?? undefined });
      let dx = 0;
      let dy = 0;

      if (client.x < rect.x) dx = rect.x - client.x;
      if (client.y < rect.y) dy = rect.y - client.y;

      const clientRight = client.x + client.width;
      const rectRight = rect.x + rect.width;
      if (clientRight > rectRight) dx = rectRight - clientRight;

      const clientBottom = client.y + client.height;
      const rectBottom = rect.y + rect.height;
      if (clientBottom > rectBottom) dy = rectBottom - clientBottom;

      if (dx !== 0 || dy !== 0) {
        node.x(node.x() + dx);
        node.y(node.y() + dy);
      }
    },
    [zones.primary]
  );

  // Handle uploaded file from ToolPanel
  useEffect(() => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        const newImage: CanvasObject = {
          id: `img-${Date.now()}`,
          type: "image",
          x: 300,
          y: 350,
          width: img.width,
          height: img.height,
          image: img,
          src: url,
          rotation: 0,
          scaleX: 0.3,
          scaleY: 0.3,
        };
        setObjects(prev => {
          const newObjects = [...prev, newImage];
          onObjectsChange?.(newObjects);
          return newObjects;
        });
        setSelectedId(newImage.id);
        onImageUpload?.(uploadedFile);
      };
    }
  }, [uploadedFile, onImageUpload, onObjectsChange]);

  const handleSelect = (id: string) => {
    if (externalSelectedId === undefined) {
      setSelectedId(id);
    }
    onSelectChange(id);
  };

  const handleDeselect = useCallback(() => {
    if (externalSelectedId === undefined) {
      setSelectedId(null);
    }
    onSelectChange(null);
    setIsPositioning(false);
  }, [onSelectChange, externalSelectedId]);

  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      // Only handle empty stage click
      if (e.target !== e.target.getStage()) return;

      const stage = stageRef.current;
      if (!stage) {
        handleDeselect();
        return;
      }

      // Text placing mode (requested from ToolPanel)
      if (placeTextRequest) {
        const pointerPosition = stage.getPointerPosition();
        if (!pointerPosition) return;

        const defaultText = placeTextRequest.text ?? "Double click to edit";
        const clamped = clampToRect(pointerPosition, zones.primary, 140, 40);

        const newText: CanvasObject = {
          id: `text-${Date.now()}`,
          type: "text",
          x: clamped.x,
          y: clamped.y,
          text: defaultText,
          fontSize: 24,
          fontFamily: "Arial",
          fill: "#000000",
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        };

        setObjects((prev) => {
          const newObjects = [...prev, newText];
          onObjectsChange?.(newObjects);
          return newObjects;
        });

        setSelectedId(newText.id);
        onSelectChange(newText.id);
        onPlaceTextConsumed?.();
        return;
      }

      // Otherwise just deselect
      handleDeselect();
    },
    [clampToRect, handleDeselect, onObjectsChange, onPlaceTextConsumed, onSelectChange, placeTextRequest, zones.primary]
  );

  const handleTransform = (id: string, newProps: Partial<CanvasObject>) => {
    setObjects(prev => {
      const updated = prev.map((obj) =>
        obj.id === id ? { ...obj, ...newProps } : obj
      );
      onObjectsChange?.(updated);
      return updated;
    });
  };

  const handleDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    setIsPositioning(false);
    handleTransform(id, {
      x: node.x(),
      y: node.y(),
    });
  };

  // Update transformer when selection changes
  useEffect(() => {
    if (transformerRef.current && currentSelectedId) {
      const node = stageRef.current?.findOne(`#${currentSelectedId}`);
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [currentSelectedId]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        style={{ width: "100%", height: "100%", display: "block" }}
        onClick={handleStageClick}
        onTap={handleStageClick}
        className="cursor-crosshair"
      >
        <Layer>
          {/* Background Product Image */}
          {bgImage && (
            <KonvaImage
              image={bgImage}
              x={bgPlacement.x}
              y={bgPlacement.y}
              width={bgPlacement.width}
              height={bgPlacement.height}
              offsetX={bgPlacement.offsetX}
              offsetY={bgPlacement.offsetY}
              listening={false}
              opacity={1}
            />
          )}

          {isPositioning || !!currentSelectedId ? (
            <>
              <Rect
                x={zones.primary.x}
                y={zones.primary.y}
                width={zones.primary.width}
                height={zones.primary.height}
                stroke="#3b82f6"
                strokeWidth={2}
                dash={[6, 3]}
                listening={false}
                opacity={0.6}
              />
              {zones.secondary ? (
                <Rect
                  x={zones.secondary.x}
                  y={zones.secondary.y}
                  width={zones.secondary.width}
                  height={zones.secondary.height}
                  stroke="#22c55e"
                  strokeWidth={2}
                  dash={[6, 3]}
                  listening={false}
                  opacity={0.6}
                />
              ) : null}
            </>
          ) : null}

          {/* Canvas Objects */}
          {objects.map((obj) => {
            if (obj.type === "text") {
              return (
                <Text
                  key={obj.id}
                  id={obj.id}
                  x={obj.x}
                  y={obj.y}
                  text={obj.text}
                  fontSize={obj.fontSize}
                  fontFamily={obj.fontFamily}
                  fill={obj.fill}
                  rotation={obj.rotation}
                  scaleX={obj.scaleX}
                  scaleY={obj.scaleY}
                  draggable
                  dragBoundFunc={(pos) => {
                    const objWidth = 100 * Math.abs(obj.scaleX || 1);
                    const objHeight = 50 * Math.abs(obj.scaleY || 1);
                    return clampToRect(pos, zones.primary, objWidth, objHeight);
                  }}
                  onClick={() => handleSelect(obj.id)}
                  onTap={() => handleSelect(obj.id)}
                  onDragStart={() => setIsPositioning(true)}
                  onDragEnd={(e) => handleDragEnd(obj.id, e)}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    clampNodeToZone(node);
                    handleTransform(obj.id, {
                      x: node.x(),
                      y: node.y(),
                      rotation: node.rotation(),
                      scaleX: node.scaleX(),
                      scaleY: node.scaleY(),
                    });
                    setIsPositioning(false);
                  }}
                />
              );
            }

            if (obj.type === "image" && obj.image) {
              return (
                <KonvaImage
                  key={obj.id}
                  id={obj.id}
                  x={obj.x}
                  y={obj.y}
                  image={obj.image}
                  width={obj.width}
                  height={obj.height}
                  rotation={obj.rotation}
                  scaleX={obj.scaleX}
                  scaleY={obj.scaleY}
                  draggable
                  dragBoundFunc={(pos) => {
                    const objWidth = (obj.width || 100) * Math.abs(obj.scaleX || 1);
                    const objHeight = (obj.height || 100) * Math.abs(obj.scaleY || 1);
                    return clampToRect(pos, zones.primary, objWidth, objHeight);
                  }}
                  onClick={() => handleSelect(obj.id)}
                  onTap={() => handleSelect(obj.id)}
                  onDragStart={() => setIsPositioning(true)}
                  onDragEnd={(e) => handleDragEnd(obj.id, e)}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    clampNodeToZone(node);
                    handleTransform(obj.id, {
                      x: node.x(),
                      y: node.y(),
                      rotation: node.rotation(),
                      scaleX: node.scaleX(),
                      scaleY: node.scaleY(),
                    });
                    setIsPositioning(false);
                  }}
                />
              );
            }

            return null;
          })}

          {/* Transformer for selected object */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limit resize
              if (newBox.width < 10 || newBox.height < 10) {
                return oldBox;
              }
              return newBox;
            }}
            anchorSize={8}
            anchorCornerRadius={4}
            borderStroke="#2563eb"
            anchorStroke="#2563eb"
            anchorFill="#ffffff"
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default KonvaCanvas;
