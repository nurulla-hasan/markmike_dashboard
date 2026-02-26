/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as fabric from 'fabric';
import FloatingMenu from './FloatingMenu';

interface CanvasBoardProps {
  canvasSize: { width: number; height: number };
  onCanvasInit: (canvas: fabric.Canvas) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  activeObject: fabric.FabricObject | null;
  settings: {
    rulers: boolean;
    grids: boolean;
    highlightEmptyText: boolean;
  };
}

const DPI = 96;

const CanvasBoard: React.FC<CanvasBoardProps> = ({ canvasSize, onCanvasInit, zoom, setZoom, activeObject, settings }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  // State copy of the canvas instance so it's safely accessible in JSX
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

  // Helper to get real dimensions in pixels
  const getRealPixels = useCallback(() => {
    return {
      width: canvasSize.width * DPI,
      height: canvasSize.height * DPI,
    };
  }, [canvasSize]);

  // Initial setup
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || fabricCanvasRef.current) return;

    // Robust check for Fabric.js v6+ already initialized
    if (canvasRef.current.parentElement?.classList.contains('canvas-container')) {
      console.warn('Fabric canvas already initialized on this element');
      return;
    }

    const { width, height } = getRealPixels();

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: width,
      height: height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      stopContextMenu: true,
      fireRightClick: true,
    });

    // ── Global selection style ──────────────────────────────────────────────
    fabric.FabricObject.prototype.set({
      borderColor: '#1CAADE',
      borderScaleFactor: 1.5,
      padding: 6,
      cornerStyle: 'circle',
      cornerColor: '#ffffff',
      cornerStrokeColor: '#1CAADE',
      cornerSize: 10,
      transparentCorners: false,
      borderDashArray: undefined,
    });

    // ── Reusable renderers ─────────────────────────────────────────────────
    const BLUE = '#1CAADE';

    /** Circle handle with subtle drop-shadow */
    const renderCircle = (
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      angle: number,
      r = 7
    ) => {
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(angle));
      // shadow
      ctx.shadowColor = 'rgba(0,0,0,0.18)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = BLUE;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    /** Thin vertical pill handle (for right-side text width resize) */
    const renderPill = (
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      angle: number
    ) => {
      const w = 7, h = 20, r = 3.5;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(angle));
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetY = 1;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, r);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = BLUE;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    /** Circle with an SVG-like icon path inside */
    const renderIconCircle = (
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      drawIcon: (ctx: CanvasRenderingContext2D) => void,
      r = 14
    ) => {
      ctx.save();
      ctx.translate(left, top);
      ctx.shadowColor = 'rgba(0,0,0,0.12)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = 'hsl(var(--border))';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = 'hsl(var(--foreground))';
      ctx.lineWidth = 1.4;
      drawIcon(ctx);
      ctx.restore();
    };

    // Move icon (crosshair arrows ⊕)
    const drawMoveIcon = (ctx: CanvasRenderingContext2D) => {
      const a = 5;
      ctx.beginPath();
      // Vertical arrow
      ctx.moveTo(0, -a); ctx.lineTo(0, a);
      // Horizontal arrow
      ctx.moveTo(-a, 0); ctx.lineTo(a, 0);
      // Arrow tips
      ctx.moveTo(-2, -a + 2); ctx.lineTo(0, -a); ctx.lineTo(2, -a + 2);
      ctx.moveTo(-2, a - 2);  ctx.lineTo(0, a);  ctx.lineTo(2, a - 2);
      ctx.moveTo(-a + 2, -2); ctx.lineTo(-a, 0); ctx.lineTo(-a + 2, 2);
      ctx.moveTo(a - 2, -2);  ctx.lineTo(a, 0);  ctx.lineTo(a - 2, 2);
      ctx.strokeStyle = 'hsl(var(--foreground))';
      ctx.lineWidth = 1.4;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    // Rotate icon (circular arrows ↻)
    const drawRotateIcon = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.arc(0, 0, 5, -Math.PI * 0.75, Math.PI * 0.5);
      ctx.strokeStyle = 'hsl(var(--foreground))';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.stroke();
      // Arrow head at end of arc
      const ex = 5 * Math.cos(Math.PI * 0.5);
      const ey = 5 * Math.sin(Math.PI * 0.5);
      ctx.beginPath();
      ctx.moveTo(ex - 2.5, ey - 1.5);
      ctx.lineTo(ex, ey);
      ctx.lineTo(ex + 2, ey - 2.5);
      ctx.strokeStyle = 'hsl(var(--foreground))';
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'round';
      ctx.stroke();
    };

    // ── Build a full control set matching the reference ────────────────────
    // Fabric.js v6 exposes built-in action handlers via controlsUtils
    const {
      scalingEqually,
      scalingX,
      rotationWithSnapping,
    } = fabric.controlsUtils;

    // Cursor handlers
    const scaleCursorHandler = fabric.controlsUtils.scaleSkewCursorStyleHandler;

    const makeControls = () => ({
      // 4 corner circles — scale equally on drag
      tl: new fabric.Control({
        x: -0.5, y: -0.5,
        cursorStyleHandler: scaleCursorHandler,
        actionHandler: scalingEqually,
        actionName: 'scaling',
        render: (ctx, l, t, _s, obj) => renderCircle(ctx, l, t, obj.angle),
      }),
      tr: new fabric.Control({
        x: 0.5, y: -0.5,
        cursorStyleHandler: scaleCursorHandler,
        actionHandler: scalingEqually,
        actionName: 'scaling',
        render: (ctx, l, t, _s, obj) => renderCircle(ctx, l, t, obj.angle),
      }),
      bl: new fabric.Control({
        x: -0.5, y: 0.5,
        cursorStyleHandler: scaleCursorHandler,
        actionHandler: scalingEqually,
        actionName: 'scaling',
        render: (ctx, l, t, _s, obj) => renderCircle(ctx, l, t, obj.angle),
      }),
      br: new fabric.Control({
        x: 0.5, y: 0.5,
        cursorStyleHandler: scaleCursorHandler,
        actionHandler: scalingEqually,
        actionName: 'scaling',
        render: (ctx, l, t, _s, obj) => renderCircle(ctx, l, t, obj.angle),
      }),
      // Right-side pill — scale width only
      mr: new fabric.Control({
        x: 0.5, y: 0,
        cursorStyleHandler: scaleCursorHandler,
        actionHandler: scalingX,
        actionName: 'scaling',
        render: (ctx, l, t, _s, obj) => renderPill(ctx, l, t, obj.angle),
      }),
      // Hide unused handles
      ml: new fabric.Control({ visible: false }),
      mt: new fabric.Control({ visible: false }),
      mb: new fabric.Control({ visible: false }),
      // Move icon — below-left, uses canvas pan action (just visual; move via drag body)
      moveCtrl: new fabric.Control({
        x: -0.5,
        y: 0.5,
        offsetX: 14,
        offsetY: 28,
        cursorStyle: 'move',
        actionHandler: fabric.controlsUtils.dragHandler,
        actionName: 'drag',
        render: (ctx, l, t) => renderIconCircle(ctx, l, t, drawMoveIcon),
      }),
      // Rotate icon — below-right
      rotateCtrl: new fabric.Control({
        x: 0.5,
        y: 0.5,
        offsetX: -14,
        offsetY: 28,
        actionName: 'rotate',
        cursorStyle: 'crosshair',
        actionHandler: rotationWithSnapping,
        render: (ctx, l, t) => renderIconCircle(ctx, l, t, drawRotateIcon),
      }),
      // Hide original rotate handle
      mtr: new fabric.Control({ visible: false }),
    });

    // Apply to generic FabricObject
    fabric.FabricObject.prototype.controls = makeControls();

    // Apply separately to IText / Textbox (keeps their text-specific width-resize)
    fabric.IText.prototype.controls = makeControls();
    fabric.Textbox.prototype.controls = {
      ...makeControls(),
      // Override mr with Textbox-specific width handler
      mr: new fabric.Control({
        x: 0.5, y: 0,
        cursorStyleHandler: scaleCursorHandler,
        actionHandler: fabric.controlsUtils.changeWidth,
        actionName: 'resizing',
        render: (ctx, l, t, _s, obj) => renderPill(ctx, l, t, obj.angle),
      }),
    };

    fabricCanvasRef.current = canvas;
    setFabricCanvas(canvas);
    onCanvasInit(canvas);

    // Scaling logic for Textbox
    canvas.on('object:scaling', (e) => {
      const obj = e.target;
      if (obj instanceof fabric.Textbox) {
        const scaleX = obj.scaleX;
        const scaleY = obj.scaleY;
        
        // If it's a corner scale (both X and Y changing similarly), update font size and width
        const newWidth = obj.width * scaleX;
        const newFontSize = obj.fontSize * scaleY;
        
        obj.set({
          width: Math.max(newWidth, 1),
          fontSize: Math.max(newFontSize, 1),
          scaleX: 1,
          scaleY: 1
        });
      }
    });

    // Mouse Wheel Zoom (with Ctrl/Alt)
    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      const isZoom = opt.e.ctrlKey || opt.e.altKey;
      
      if (isZoom) {
        let newZoom = canvas.getZoom();
        newZoom *= 0.999 ** delta;
        if (newZoom > 20) newZoom = 20;
        if (newZoom < 0.01) newZoom = 0.01;
        
        canvas.zoomToPoint(new fabric.Point(opt.e.offsetX, opt.e.offsetY), newZoom);
        setZoom(newZoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      }
    });

    // Initial Fit to Container (Commented out to maintain initial 50% zoom as requested)
    // const fitToContainer = () => {
    //   if (!containerRef.current) return;
    //   const containerWidth = containerRef.current.clientWidth - 150;
    //   const containerHeight = containerRef.current.clientHeight - 150;
    //   
    //   const scale = Math.min(
    //     containerWidth / width,
    //     containerHeight / height
    //   );
    //   
    //   setZoom(scale);
    // };

    // fitToContainer();
    // window.addEventListener('resize', fitToContainer);

    return () => {
      // window.removeEventListener('resize', fitToContainer);
      fabricCanvasRef.current = null;
      canvas.dispose().catch(err => console.error('Error disposing canvas:', err));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount — intentionally exclude deps

  // Handle zoom and dimension updates
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const { width, height } = getRealPixels();

    // Update internal dimensions and scale
    canvas.setDimensions({
      width: width * zoom,
      height: height * zoom
    });
    
    canvas.setZoom(zoom);
    canvas.renderAll();
  }, [zoom, canvasSize, getRealPixels]);

  // Handle Guidelines and Grids
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const { width, height } = getRealPixels();

    // Remove existing guidelines and grids
    canvas.getObjects().forEach((obj: any) => {
      if (obj.name?.startsWith('guideline_') || obj.name?.startsWith('grid_')) {
        canvas.remove(obj);
      }
    });

    // Draw Grids if enabled
    if (settings.grids) {
      const gridSize = 0.5 * DPI; // 0.5 inch grid
      const gridColor = 'rgba(0, 0, 0, 0.05)';
      
      // Vertical lines
      for (let i = 0; i <= width; i += gridSize) {
        canvas.add(new fabric.Line([i, 0, i, height], {
          stroke: gridColor,
          selectable: false,
          evented: false,
          name: 'grid_v',
          excludeFromExport: true,
        }));
      }
      
      // Horizontal lines
      for (let i = 0; i <= height; i += gridSize) {
        canvas.add(new fabric.Line([0, i, width, i], {
          stroke: gridColor,
          selectable: false,
          evented: false,
          name: 'grid_h',
          excludeFromExport: true,
        }));
      }
    }

    canvas.renderAll();
  }, [settings.grids, canvasSize, zoom, getRealPixels]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-auto bg-muted/20">
      <div className="min-w-full min-h-full flex items-center justify-center p-20">
        <div className="relative shrink-0">
        {/* Dimension Rulers */}
          {settings.rulers && (
            <div className="absolute inset-0 pointer-events-none">
              <div 
                style={{ 
                  width: canvasSize.width * DPI * zoom, 
                  height: canvasSize.height * DPI * zoom,
                  position: 'relative'
                }}
              >
                {/* Left Ruler (Vertical) */}
                <div className="absolute -left-16 top-0 bottom-0 w-12 flex flex-col items-center justify-center">
                  <div className="h-full w-[1.5px] bg-border relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[1.5px] bg-muted-foreground/30" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[1.5px] bg-muted-foreground/30" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <div className="bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">
                      <span className="text-[11px] font-bold text-muted-foreground whitespace-nowrap">{canvasSize.height}in</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Ruler (Horizontal) */}
                <div className="absolute -bottom-16 left-0 right-0 h-12 flex items-center justify-center">
                  <div className="w-full h-[1.5px] bg-border relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1.5px] h-3 bg-muted-foreground/30" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-3 bg-muted-foreground/30" />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">
                      <span className="text-[11px] font-bold text-muted-foreground whitespace-nowrap">{canvasSize.width}in</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Canvas Container */}
          <div 
            className="shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden bg-background border border-border"
            style={{
              width: canvasSize.width * DPI * zoom,
              height: canvasSize.height * DPI * zoom
            }}
          >
            <canvas ref={canvasRef} />
          </div>

          {/* Floating Menu - Positioned relative to this centered canvas container */}
          {activeObject && fabricCanvas && (
            <FloatingMenu 
              canvas={fabricCanvas} 
              activeObject={activeObject} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvasBoard;
