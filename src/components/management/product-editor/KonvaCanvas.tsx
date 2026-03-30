import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import {
  Stage, Layer, Image as KonvaImage, Text, Transformer,
  Rect, Circle, RegularPolygon, Star as KonvaStar,
} from "react-konva";
import Konva from "konva";
import type { ToolType } from "./ProductEditor";

export interface CanvasObject {
  id: string;
  type: "image" | "text" | "shape";
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  // image
  image?: HTMLImageElement;
  src?: string;
  // text
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  textAlign?: string;
  // shared fill/stroke
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  // shape
  shapeType?: "rect" | "circle" | "triangle" | "star" | "pentagon";
}

interface KonvaCanvasProps {
  activeTool: ToolType;
  productImage: string;
  objects: CanvasObject[];
  selectedId: string | null;
  zoom: number;
  onSelectChange: (id: string | null) => void;
  onObjectsChange: (objects: CanvasObject[]) => void;
  onDropFile?: (file: File) => void;
}

export function KonvaCanvas({
  activeTool: _activeTool,
  productImage,
  objects,
  selectedId,
  zoom,
  onSelectChange,
  onObjectsChange,
  onDropFile,
}: KonvaCanvasProps) {
  void _activeTool;
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState({ width: 600, height: 700 });
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [isPositioning, setIsPositioning] = useState(false);

  // Load background image
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = productImage;
    img.onload = () => setBgImage(img);
  }, [productImage]);

  // Responsive stage size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setStageSize(p =>
        p.width === Math.floor(width) && p.height === Math.floor(height)
          ? p
          : { width: Math.max(1, Math.floor(width)), height: Math.max(1, Math.floor(height)) }
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Background image placement (fills stage internal coords, centred)
  const bgPlacement = useMemo(() => {
    const W = stageSize.width;
    const H = stageSize.height;
    if (!bgImage) return { x: W / 2, y: H / 2, width: W, height: H, offsetX: W / 2, offsetY: H / 2 };
    const scale = Math.min(W / bgImage.width, H / bgImage.height);
    const w = bgImage.width * scale;
    const h = bgImage.height * scale;
    return { x: W / 2, y: H / 2, width: w, height: h, offsetX: w / 2, offsetY: h / 2 };
  }, [bgImage, stageSize]);

  // Print zones
  const zones = useMemo(() => {
    const l = bgPlacement.x - bgPlacement.offsetX;
    const t = bgPlacement.y - bgPlacement.offsetY;
    const W = bgPlacement.width;
    const H = bgPlacement.height;
    const v = productImage.toLowerCase();
    if (v.includes("back"))
      return { primary: { x: l + W * 0.22, y: t + H * 0.18, width: W * 0.56, height: H * 0.60 } };
    if (v.includes("l sleeve") || v.includes("left sleeve"))
      return { primary: { x: l + W * 0.42, y: t + H * 0.22, width: W * 0.18, height: H * 0.58 } };
    if (v.includes("r sleeve") || v.includes("right sleeve"))
      return { primary: { x: l + W * 0.40, y: t + H * 0.22, width: W * 0.18, height: H * 0.58 } };
    return {
      primary: { x: l + W * 0.26, y: t + H * 0.33, width: W * 0.26, height: H * 0.26 },
      secondary: { x: l + W * 0.57, y: t + H * 0.34, width: W * 0.14, height: H * 0.14 },
    };
  }, [bgPlacement, productImage]);

  const clampToRect = useCallback(
    (pos: { x: number; y: number }, rect: { x: number; y: number; width: number; height: number }, objW: number, objH: number) => ({
      x: Math.max(rect.x + objW / 2, Math.min(pos.x, rect.x + rect.width - objW / 2)),
      y: Math.max(rect.y + objH / 2, Math.min(pos.y, rect.y + rect.height - objH / 2)),
    }),
    []
  );

  const clampNodeToZone = useCallback((node: Konva.Node) => {
    const rect = zones.primary;
    if (!rect) return;
    const client = node.getClientRect({ relativeTo: stageRef.current ?? undefined });
    let dx = 0, dy = 0;
    if (client.x < rect.x) dx = rect.x - client.x;
    if (client.y < rect.y) dy = rect.y - client.y;
    if (client.x + client.width > rect.x + rect.width) dx = rect.x + rect.width - client.x - client.width;
    if (client.y + client.height > rect.y + rect.height) dy = rect.y + rect.height - client.y - client.height;
    if (dx !== 0 || dy !== 0) { node.x(node.x() + dx); node.y(node.y() + dy); }
  }, [zones.primary]);

  // Sync transformer
  useEffect(() => {
    if (!transformerRef.current) return;
    if (selectedId) {
      const node = stageRef.current?.findOne(`#${selectedId}`);
      if (node) { transformerRef.current.nodes([node]); transformerRef.current.getLayer()?.batchDraw(); }
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId, objects]);

  // Keyboard: Delete/Backspace removes selected object
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (editingTextId) return;
      if (!selectedId) return;
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Delete" || e.key === "Backspace") {
        onObjectsChange(objects.filter(o => o.id !== selectedId));
        onSelectChange(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, editingTextId, objects, onObjectsChange, onSelectChange]);

  // ── Inline text editing via floating textarea ─────────────────────────────
  const startTextEdit = useCallback((obj: CanvasObject) => {
    const stage = stageRef.current;
    if (!stage) return;
    const textNode = stage.findOne(`#${obj.id}`) as Konva.Text;
    if (!textNode) return;

    setEditingTextId(obj.id);
    textNode.visible(false);
    stage.batchDraw();

    const absPos = textNode.getAbsolutePosition();
    const stageRect = stage.container().getBoundingClientRect();
    const panX = stageSize.width / 2 * (1 - zoom);
    const panY = stageSize.height / 2 * (1 - zoom);

    const cx = stageRect.left + absPos.x * zoom + panX;
    const cy = stageRect.top + absPos.y * zoom + panY;

    const ta = document.createElement("textarea");
    document.body.appendChild(ta);

    Object.assign(ta.style, {
      position: "fixed",
      top: `${cy}px`,
      left: `${cx}px`,
      width: `${Math.max(120, (textNode.width() || 200)) * zoom}px`,
      minHeight: `${(obj.fontSize || 24) * 1.5 * zoom}px`,
      fontSize: `${(obj.fontSize || 24) * zoom}px`,
      fontFamily: obj.fontFamily || "Arial",
      fontStyle: obj.fontStyle || "normal",
      textAlign: (obj.textAlign as string) || "left",
      color: obj.fill || "#000000",
      border: "2px dashed #2563eb",
      padding: "2px 4px",
      margin: "0",
      overflow: "hidden",
      background: "rgba(255,255,255,0.92)",
      outline: "none",
      resize: "none",
      lineHeight: "1.2",
      transform: `rotateZ(${obj.rotation || 0}deg)`,
      transformOrigin: "left top",
      zIndex: "99999",
      boxSizing: "border-box",
      borderRadius: "2px",
    });

    ta.value = obj.text || "";
    ta.focus();
    ta.select();

    const finish = () => {
      const newText = ta.value;
      ta.parentNode?.removeChild(ta);
      textNode.visible(true);
      setEditingTextId(null);
      if (newText !== obj.text) {
        onObjectsChange(objects.map(o => o.id === obj.id ? { ...o, text: newText } : o));
      }
      stage.batchDraw();
    };

    ta.addEventListener("blur", finish);
    ta.addEventListener("keydown", e => {
      e.stopPropagation();
      if (e.key === "Escape") { ta.removeEventListener("blur", finish); finish(); }
      if (e.key === "Enter" && !e.shiftKey) { ta.removeEventListener("blur", finish); finish(); }
    });
  }, [objects, onObjectsChange, zoom, stageSize]);

  // Stage click: deselect on empty area
  const handleStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (e.target !== e.target.getStage()) return;
    onSelectChange(null);
    setIsPositioning(false);
  }, [onSelectChange]);

  const handleTransform = useCallback((id: string, props: Partial<CanvasObject>) => {
    onObjectsChange(objects.map(o => o.id === id ? { ...o, ...props } : o));
  }, [objects, onObjectsChange]);

  const handleDragEnd = useCallback((id: string, e: Konva.KonvaEventObject<DragEvent>) => {
    setIsPositioning(false);
    handleTransform(id, { x: e.target.x(), y: e.target.y() });
  }, [handleTransform]);

  // Drag-and-drop file
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) onDropFile?.(file);
  }, [onDropFile]);

  // Shared drag props for all objects
  const dragProps = (obj: CanvasObject, objW: number, objH: number) => ({
    draggable: true,
    dragBoundFunc: (pos: { x: number; y: number }) => clampToRect(pos, zones.primary, objW, objH),
    onClick: () => onSelectChange(obj.id),
    onTap: () => onSelectChange(obj.id),
    onDragStart: () => setIsPositioning(true),
    onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(obj.id, e),
    onTransformEnd: (e: Konva.KonvaEventObject<Event>) => {
      const n = e.target;
      clampNodeToZone(n);
      handleTransform(obj.id, { x: n.x(), y: n.y(), rotation: n.rotation(), scaleX: n.scaleX(), scaleY: n.scaleY() });
      setIsPositioning(false);
    },
  });

  // Zoom: Stage scaleX/Y with centering so design-space center stays on screen
  const panX = stageSize.width / 2 * (1 - zoom);
  const panY = stageSize.height / 2 * (1 - zoom);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        scaleX={zoom}
        scaleY={zoom}
        x={panX}
        y={panY}
        style={{ width: "100%", height: "100%", display: "block" }}
        onClick={handleStageClick}
        onTap={handleStageClick}
      >
        <Layer>
          {/* Background product image */}
          {bgImage && (
            <KonvaImage
              image={bgImage}
              x={bgPlacement.x} y={bgPlacement.y}
              width={bgPlacement.width} height={bgPlacement.height}
              offsetX={bgPlacement.offsetX} offsetY={bgPlacement.offsetY}
              listening={false}
            />
          )}

          {/* Print zone guides (show when object selected or dragging) */}
          {(isPositioning || !!selectedId) && (
            <>
              <Rect x={zones.primary.x} y={zones.primary.y}
                width={zones.primary.width} height={zones.primary.height}
                stroke="#3b82f6" strokeWidth={2} dash={[6, 3]}
                listening={false} opacity={0.7} />
              {zones.secondary && (
                <Rect x={zones.secondary.x} y={zones.secondary.y}
                  width={zones.secondary.width} height={zones.secondary.height}
                  stroke="#22c55e" strokeWidth={2} dash={[6, 3]}
                  listening={false} opacity={0.7} />
              )}
            </>
          )}

          {/* Render all canvas objects */}
          {objects.map(obj => {
            if (obj.type === "text") {
              return (
                <Text
                  key={obj.id} id={obj.id}
                  x={obj.x} y={obj.y}
                  text={obj.text || ""}
                  fontSize={obj.fontSize || 24}
                  fontFamily={obj.fontFamily || "Arial"}
                  fontStyle={obj.fontStyle || "normal"}
                  align={(obj.textAlign as Konva.TextConfig["align"]) || "left"}
                  fill={obj.fill || "#000000"}
                  stroke={obj.stroke} strokeWidth={obj.strokeWidth}
                  rotation={obj.rotation} scaleX={obj.scaleX} scaleY={obj.scaleY}
                  onDblClick={() => startTextEdit(obj)}
                  onDblTap={() => startTextEdit(obj)}
                  {...dragProps(obj, (obj.fontSize || 24) * 5, obj.fontSize || 24)}
                />
              );
            }

            if (obj.type === "image" && obj.image) {
              const iW = (obj.width || 100) * (obj.scaleX || 1);
              const iH = (obj.height || 100) * (obj.scaleY || 1);
              return (
                <KonvaImage
                  key={obj.id} id={obj.id}
                  x={obj.x} y={obj.y}
                  image={obj.image}
                  width={obj.width} height={obj.height}
                  rotation={obj.rotation} scaleX={obj.scaleX} scaleY={obj.scaleY}
                  {...dragProps(obj, iW, iH)}
                />
              );
            }

            if (obj.type === "shape") {
              const sharedProps = {
                key: obj.id, id: obj.id,
                x: obj.x, y: obj.y,
                rotation: obj.rotation, scaleX: obj.scaleX, scaleY: obj.scaleY,
                fill: obj.fill || "#000000",
                stroke: obj.stroke, strokeWidth: obj.strokeWidth,
                ...dragProps(obj, 100, 100),
              };
              switch (obj.shapeType) {
                case "circle": return <Circle {...sharedProps} radius={50} />;
                case "triangle": return <RegularPolygon {...sharedProps} sides={3} radius={60} />;
                case "pentagon": return <RegularPolygon {...sharedProps} sides={5} radius={60} />;
                case "star": return <KonvaStar {...sharedProps} numPoints={5} innerRadius={30} outerRadius={60} />;
                default: return <Rect {...sharedProps} width={100} height={100} offsetX={50} offsetY={50} />;
              }
            }
            return null;
          })}

          {/* Transformer for selected object */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(old, n) => (n.width < 10 || n.height < 10 ? old : n)}
            anchorSize={9} anchorCornerRadius={5}
            borderStroke="#2563eb" anchorStroke="#2563eb" anchorFill="#ffffff"
            rotateAnchorOffset={32}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default KonvaCanvas;
