import React, { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Lock, Unlock, Copy, Trash2, MoreHorizontal, ChevronRight, Layers, LayoutList, FlipHorizontal, FlipVertical, AlignCenterHorizontal, AlignCenterVertical } from "lucide-react";
import { cn } from '@/lib/utils';

interface FloatingMenuProps {
  canvas: fabric.Canvas;
  activeObject: fabric.FabricObject;
}

// ── Nested submenu item type ──────────────────────────────────────────────────
interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  action?: () => void;
  children?: { label: string; icon?: React.ReactNode; action: () => void }[];
}



// ── Main component ─────────────────────────────────────────────────────────────
const FloatingMenu: React.FC<FloatingMenuProps> = ({ canvas, activeObject }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [locked, setLocked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const isImage = activeObject instanceof fabric.Image;

  // ── Position tracking ──────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const bound = activeObject.getBoundingRect();
      const vt = canvas.viewportTransform;
      const zoom = canvas.getZoom();
      setPosition({
        top: bound.top * zoom + (vt?.[5] ?? 0) - 52,
        left: bound.left * zoom + (vt?.[4] ?? 0) + (bound.width * zoom) / 2,
      });
      setLocked(activeObject.lockMovementX ?? false);
    };
    update();
    canvas.on('object:moving', update);
    canvas.on('object:scaling', update);
    canvas.on('object:rotating', update);
    canvas.on('selection:updated', update);
    return () => {
      canvas.off('object:moving', update);
      canvas.off('object:scaling', update);
      canvas.off('object:rotating', update);
      canvas.off('selection:updated', update);
    };
  }, [activeObject, canvas]);

  // ── Close on outside click ─────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────────
  const close = () => { setShowMore(false); setActiveSubmenu(null); };
  const cw = canvas.width ?? 800;
  const ch = canvas.height ?? 600;

  const handleDelete = () => { canvas.remove(activeObject); canvas.discardActiveObject(); canvas.renderAll(); };
  const handleDuplicate = async () => {
    const c = await activeObject.clone();
    c.set({ left: (activeObject.left ?? 0) + 20, top: (activeObject.top ?? 0) + 20 });
    canvas.add(c); canvas.setActiveObject(c); canvas.renderAll();
  };
  const handleLock = () => {
    const next = !locked;
    activeObject.set({ lockMovementX: next, lockMovementY: next, lockRotation: next, lockScalingX: next, lockScalingY: next, hasControls: !next });
    setLocked(next); canvas.renderAll();
  };

  const handleSendToBack = () => {
    canvas.sendObjectToBack(activeObject);
    // Ensure background stays at the bottom
    const objects = canvas.getObjects();
    const bg = objects.find(o => o.excludeFromExport && o instanceof fabric.Rect);
    if (bg) {
      canvas.sendObjectToBack(bg);
    }
    canvas.renderAll();
    close();
  };

  // ── Menu data: standard vs image ──────────────────────────────────────────
  const standardItems: MenuItem[] = [
    { label: 'Send to front', shortcut: '⌘]', action: () => { canvas.bringObjectToFront(activeObject); canvas.renderAll(); close(); } },
    { label: 'Send to back',  shortcut: '⌘[', action: handleSendToBack },
    { label: 'Flip horizontal', action: () => { activeObject.set({ flipX: !activeObject.flipX }); canvas.renderAll(); close(); } },
    { label: 'Flip vertical',   action: () => { activeObject.set({ flipY: !activeObject.flipY }); canvas.renderAll(); close(); } },
  ];

  const imageItems: MenuItem[] = [
    {
      label: 'Arrange',
      icon: <Layers size={15} strokeWidth={1.8} />,
      children: [
        { label: 'Send to front', action: () => { canvas.bringObjectToFront(activeObject); canvas.renderAll(); close(); } },
        { label: 'Send to back',  action: handleSendToBack },
      ],
    },
    {
      label: 'Align',
      icon: <LayoutList size={15} strokeWidth={1.8} />,
      children: [
        {
          label: 'Center', icon: <AlignCenterHorizontal size={15} strokeWidth={1.8} />,
          action: () => {
            activeObject.set({ left: cw / 2 - activeObject.getScaledWidth() / 2 });
            activeObject.setCoords();
            canvas.renderAll(); close();
          },
        },
        {
          label: 'Middle', icon: <AlignCenterVertical size={15} strokeWidth={1.8} />,
          action: () => {
            activeObject.set({ top: ch / 2 - activeObject.getScaledHeight() / 2 });
            activeObject.setCoords();
            canvas.renderAll(); close();
          },
        },
      ],
    },
    {
      label: 'Flip',
      icon: <FlipHorizontal size={15} strokeWidth={1.8} />,
      children: [
        { label: 'Vertically',   icon: <FlipVertical size={15} strokeWidth={1.8} />, action: () => { activeObject.set({ flipY: !activeObject.flipY }); canvas.renderAll(); close(); } },
        { label: 'Horizontally', icon: <FlipHorizontal size={15} strokeWidth={1.8} />, action: () => { activeObject.set({ flipX: !activeObject.flipX }); canvas.renderAll(); close(); } },
      ],
    },
  ];

  const btn = 'w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer';

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className="absolute z-50 -translate-x-1/2 select-none"
        style={{ top: position.top, left: position.left }}
      >
        {/* Pill toolbar */}
        <div className="flex items-center gap-0.5 bg-background border border-border rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] px-1.5 py-1">

          <Tooltip>
            <TooltipTrigger asChild>
              <button className={btn} onClick={handleLock}>
                {locked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">{locked ? 'Unlock' : 'Lock'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className={btn} onClick={handleDuplicate}><Copy className="w-3.5 h-3.5" /></button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">Duplicate</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={handleDelete}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">Delete</TooltipContent>
          </Tooltip>

          <div className="w-px h-4 bg-border mx-0.5" />

          {/* More ··· */}
          <div className="relative" ref={moreRef}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={cn(btn, showMore && 'bg-accent text-accent-foreground')}
                  onClick={() => { setShowMore(v => !v); setActiveSubmenu(null); }}
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">More options</TooltipContent>
            </Tooltip>

            {showMore && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 animate-in fade-in zoom-in-95 duration-150">
                {isImage ? (
                  /* ── Image nested menu ── */
                  <div className="flex gap-1 items-start">
                    {/* Primary menu */}
                    <div className="w-44 bg-popover border border-border rounded-xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] overflow-hidden py-1.5">
                      {imageItems.map(item => (
                        <button
                          key={item.label}
                          onMouseEnter={() => setActiveSubmenu(item.label)}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 text-[13px] text-foreground hover:bg-accent transition-colors',
                            activeSubmenu === item.label && 'bg-accent'
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-muted-foreground">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      ))}
                    </div>

                    {/* Submenu */}
                    {activeSubmenu && (
                      <div className="w-40 bg-popover border border-border rounded-xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] overflow-hidden py-1.5 animate-in fade-in slide-in-from-left-1 duration-100">
                        {imageItems
                          .find(i => i.label === activeSubmenu)
                          ?.children?.map(child => (
                            <button
                              key={child.label}
                              onClick={child.action}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-accent transition-colors"
                            >
                              {child.icon && <span className="text-muted-foreground">{child.icon}</span>}
                              <span>{child.label}</span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── Standard flat menu ── */
                  <div className="w-48 bg-popover border border-border rounded-xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] overflow-hidden py-1">
                    {standardItems.map(item => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-foreground hover:bg-accent transition-colors"
                      >
                        <span>{item.label}</span>
                        {item.shortcut && <span className="text-[11px] text-muted-foreground font-mono">{item.shortcut}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FloatingMenu;
