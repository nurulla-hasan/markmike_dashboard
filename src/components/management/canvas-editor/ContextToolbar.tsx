/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { Wand2, RotateCcw, SlidersHorizontal, AlignLeft, AlignCenter, List, ArrowUpDown, ALargeSmall, ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ContextToolbarProps {
  canvas: fabric.Canvas | null;
  activeObject: fabric.FabricObject | null;
}

// ─── Small Icon Button ────────────────────────────────────────────────────────
const ToolBtn = ({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  title?: string;
}) => (
  <button
    title={title}
    onClick={onClick}
    className={cn(
      'flex items-center justify-center w-8 h-8 rounded-md text-[13px] font-medium transition-colors',
      active
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    )}
  >
    {children}
  </button>
);

// ─── Slider with reset + input ────────────────────────────────────────────────
const SliderControl = ({
  label,
  value,
  min,
  max,
  step,
  defaultValue,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onChange: (v: number) => void;
}) => {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {/* Slider */}
        <div className="flex-1 relative h-5 flex items-center">
          <div className="w-full h-0.75 bg-secondary rounded-full relative">
            <div
              className="absolute left-0 top-0 h-full bg-primary rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-sm pointer-events-none"
            style={{ left: `calc(${percent}% - 8px)` }}
          />
        </div>
        {/* Reset */}
        <button
          onClick={() => onChange(defaultValue)}
          title="Reset"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw size={14} strokeWidth={2.5} />
        </button>
        {/* Value input */}
        <input
          type="number"
          value={value}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-12 h-7 text-center text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
};

// ─── Main Toolbar ─────────────────────────────────────────────────────────────
const ContextToolbar: React.FC<ContextToolbarProps> = ({ canvas, activeObject }) => {
  const [fontWeight, setFontWeight] = useState('normal');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [fill, setFill] = useState('#000000');
  const [lineHeight, setLineHeight] = useState(1.16);
  const [charSpacing, setCharSpacing] = useState(0);
  const [showFormat, setShowFormat] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  // Image-specific
  const [imgOpacity, setImgOpacity] = useState(1);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [showAdjust, setShowAdjust] = useState(false);
  const adjustRef = useRef<HTMLDivElement>(null);

  const formatRef = useRef<HTMLDivElement>(null);
  const effectsRef = useRef<HTMLDivElement>(null);

  // Sync state when activeObject changes
  useEffect(() => {
    if (!activeObject || !(activeObject instanceof fabric.IText)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFontWeight(activeObject.fontWeight?.toString() || 'normal');
    setTextAlign((activeObject.textAlign as any) || 'left');
    setFill(activeObject.fill as string || '#000000');
    setLineHeight(activeObject.lineHeight ?? 1.16);
    setCharSpacing((activeObject.charSpacing ?? 0) / 100);
  }, [activeObject]);

  // Sync image state
  useEffect(() => {
    if (!activeObject || activeObject.type !== 'image') return;
    const img = activeObject as fabric.FabricImage;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImgOpacity(img.opacity ?? 1);
    setHue(0); setSaturation(0); setBrightness(0);
  }, [activeObject]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (formatRef.current && !formatRef.current.contains(e.target as Node)) setShowFormat(false);
      if (effectsRef.current && !effectsRef.current.contains(e.target as Node)) setShowEffects(false);
      if (adjustRef.current && !adjustRef.current.contains(e.target as Node)) setShowAdjust(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const updateObject = (props: Partial<any>) => {
    if (!canvas || !activeObject) return;
    activeObject.set(props);
    canvas.renderAll();
  };

  const toggleBold = () => {
    const next = fontWeight === 'bold' ? 'normal' : 'bold';
    setFontWeight(next);
    updateObject({ fontWeight: next });
  };

  const setAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    setTextAlign(align);
    updateObject({ textAlign: align });
  };

  const applyLineHeight = (v: number) => {
    setLineHeight(v);
    updateObject({ lineHeight: v });
  };

  const applyCharSpacing = (v: number) => {
    setCharSpacing(v);
    updateObject({ charSpacing: v * 100 }); // fabric uses 1/1000 em
  };

  const applyCase = (type: 'title' | 'lower' | 'upper') => {
    if (!activeObject || !(activeObject instanceof fabric.IText)) return;
    const original = activeObject.text || '';
    let result = original;
    if (type === 'upper') result = original.toUpperCase();
    else if (type === 'lower') result = original.toLowerCase();
    else if (type === 'title')
      result = original.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    updateObject({ text: result });
  };

  // ── No selection ───────────────────────────────────────────────────────────
  if (!activeObject) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-9 gap-2 text-[13px] font-medium text-muted-foreground">
          <Wand2 className="h-4 w-4" />
          Smart Design
        </Button>
      </div>
    );
  }

  const isText = activeObject instanceof fabric.IText;
  const isImage = activeObject.type === 'image';

  // ── Apply image filters helper ──────────────────────────────────────────────
  const applyImageFilters = (
    h: number = hue,
    s: number = saturation,
    b: number = brightness
  ) => {
    if (!canvas || !activeObject || activeObject.type !== 'image') return;
    const img = activeObject as fabric.FabricImage;
    const filters = [
      new fabric.filters.HueRotation({ rotation: h }),
      new fabric.filters.Saturation({ saturation: s }),
      new fabric.filters.Brightness({ brightness: b }),
    ];
    img.set({ filters });
    img.applyFilters();
    canvas.renderAll();
  };

  // ── Image toolbar ────────────────────────────────────────────────────────────
  if (isImage) {
    const imgObj = activeObject as fabric.FabricImage;

    return (
      <div className="flex items-center gap-1 w-full">
        {/* Adjust */}
        <div className="relative" ref={adjustRef}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAdjust(v => !v)}
                className={cn(
                  'h-8 px-3 text-[13px] font-medium transition-colors flex items-center gap-1.5',
                  showAdjust ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <SlidersHorizontal size={14} strokeWidth={2} />
                Adjust
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>Image adjustments</TooltipContent>
          </Tooltip>

          {showAdjust && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-2xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] p-5 space-y-5 z-9999 animate-in fade-in zoom-in-95 duration-150">
              {/* Hue */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Hue</span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative h-5 flex items-center">
                    <div
                      className="w-full h-1 rounded-full"
                      style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}
                    />
                    <input
                      type="range" min={-180} max={180} step={1} value={hue}
                      onChange={e => { const v = +e.target.value; setHue(v); applyImageFilters(v, saturation, brightness); }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-foreground rounded-full shadow-[0_1px_6px_rgba(0,0,0,0.35)] pointer-events-none border-2 border-background"
                      style={{ left: `calc(${((hue + 180) / 360) * 100}% - 10px)` }}
                    />
                  </div>
                  <button onClick={() => { setHue(0); applyImageFilters(0, saturation, brightness); }} className="text-muted-foreground hover:text-foreground transition-colors">
                    <RotateCcw size={13} strokeWidth={2.5} />
                  </button>
                  <input
                    type="number" value={hue} step={1}
                    onChange={e => { const v = +e.target.value; setHue(v); applyImageFilters(v, saturation, brightness); }}
                    className="w-14 h-7 text-center text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Saturation */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Saturation</span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative h-5 flex items-center">
                    <div
                      className="w-full h-1 rounded-full"
                      style={{ background: 'linear-gradient(to right, #9e9e9e, #ff8c00)' }}
                    />
                    <input
                      type="range" min={-1} max={1} step={0.01} value={saturation}
                      onChange={e => { const v = +e.target.value; setSaturation(v); applyImageFilters(hue, v, brightness); }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-foreground rounded-full shadow-[0_1px_6px_rgba(0,0,0,0.35)] pointer-events-none border-2 border-background"
                      style={{ left: `calc(${((saturation + 1) / 2) * 100}% - 10px)` }}
                    />
                  </div>
                  <button onClick={() => { setSaturation(0); applyImageFilters(hue, 0, brightness); }} className="text-muted-foreground hover:text-foreground transition-colors">
                    <RotateCcw size={13} strokeWidth={2.5} />
                  </button>
                  <input
                    type="number" value={saturation} step={0.01}
                    onChange={e => { const v = +e.target.value; setSaturation(v); applyImageFilters(hue, v, brightness); }}
                    className="w-14 h-7 text-center text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Brightness */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Brightness</span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative h-5 flex items-center">
                    <div
                      className="w-full h-1 rounded-full"
                      style={{ background: 'linear-gradient(to right, #1a1a1a, #d4d4d4)' }}
                    />
                    <input
                      type="range" min={-1} max={1} step={0.01} value={brightness}
                      onChange={e => { const v = +e.target.value; setBrightness(v); applyImageFilters(hue, saturation, v); }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-foreground rounded-full shadow-[0_1px_6px_rgba(0,0,0,0.35)] pointer-events-none border-2 border-background"
                      style={{ left: `calc(${((brightness + 1) / 2) * 100}% - 10px)` }}
                    />
                  </div>
                  <button onClick={() => { setBrightness(0); applyImageFilters(hue, saturation, 0); }} className="text-muted-foreground hover:text-foreground transition-colors">
                    <RotateCcw size={13} strokeWidth={2.5} />
                  </button>
                  <input
                    type="number" value={brightness} step={0.01}
                    onChange={e => { const v = +e.target.value; setBrightness(v); applyImageFilters(hue, saturation, v); }}
                    className="w-14 h-7 text-center text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-border mx-0.5" />

        {/* Opacity */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-muted-foreground">Opacity</span>
          <div className="relative flex items-center w-24 h-5">
            <div className="w-full h-0.75 rounded-full bg-secondary relative">
              <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: `${imgOpacity * 100}%` }} />
            </div>
            <input
              type="range" min={0} max={1} step={0.01} value={imgOpacity}
              onChange={e => {
                const v = +e.target.value;
                setImgOpacity(v);
                imgObj.set({ opacity: v });
                canvas?.renderAll();
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-foreground rounded-full shadow pointer-events-none border border-background"
              style={{ left: `calc(${imgOpacity * 100}% - 7px)` }}
            />
          </div>
          <span className="text-[12px] font-medium text-foreground w-8 text-right">{Math.round(imgOpacity * 100)}%</span>
        </div>
      </div>
    );
  }

  // ── Text toolbar ───────────────────────────────────────────────────────────
  if (!isText) return null;

  return (
    <div className="flex items-center gap-1 w-full">
      {/* Color swatch */}
      <div className="relative group">
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors">
          <div
            className="w-4 h-4 rounded-full border border-border shadow-sm"
            style={{ backgroundColor: fill }}
          />
        </button>
        <input
          type="color"
          className="absolute inset-0 opacity-0 cursor-pointer"
          value={fill}
          onChange={(e) => {
            setFill(e.target.value);
            updateObject({ fill: e.target.value });
          }}
        />
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-border mx-0.5" />

      {/* Bold */}
      <ToolBtn active={fontWeight === 'bold'} onClick={toggleBold} title="Bold">
        <span className="font-bold text-sm">B</span>
      </ToolBtn>

      {/* Align */}
      <ToolBtn
        active={textAlign === 'left'}
        onClick={() => setAlign('left')}
        title="Align left"
      >
        <AlignLeft size={16} strokeWidth={2.2} />
      </ToolBtn>
      <ToolBtn
        active={textAlign === 'center'}
        onClick={() => setAlign('center')}
        title="Align center"
      >
        <AlignCenter size={16} strokeWidth={2.2} />
      </ToolBtn>

      {/* List icon */}
      <ToolBtn title="List">
        <List size={16} strokeWidth={2.2} />
      </ToolBtn>

      {/* Line spacing icon */}
      <ToolBtn title="Line spacing" onClick={() => { setShowFormat(true); setShowEffects(false); }}>
        <ArrowUpDown size={16} strokeWidth={2.2} />
      </ToolBtn>

      {/* Divider */}
      <div className="w-px h-5 bg-border mx-0.5" />

      {/* Format dropdown */}
      <div className="relative" ref={formatRef}>
        <button
          onClick={() => { setShowFormat(!showFormat); setShowEffects(false); }}
          className={cn(
            'h-8 px-3 rounded-md text-[13px] font-medium transition-colors',
            showFormat ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          Format
        </button>
        {showFormat && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-popover border border-border rounded-2xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] p-4 space-y-5 z-50 animate-in fade-in zoom-in-95 duration-150">
            <SliderControl
              label="Line spacing"
              value={lineHeight}
              min={0.5}
              max={4}
              step={0.01}
              defaultValue={1.16}
              onChange={applyLineHeight}
            />
            <SliderControl
              label="Letter spacing"
              value={charSpacing}
              min={-0.5}
              max={2}
              step={0.01}
              defaultValue={0}
              onChange={applyCharSpacing}
            />
          </div>
        )}
      </div>

      {/* Effects dropdown */}
      <div className="relative" ref={effectsRef}>
        <button
          onClick={() => { setShowEffects(!showEffects); setShowFormat(false); }}
          className={cn(
            'h-8 px-3 rounded-md text-[13px] font-medium transition-colors flex items-center gap-1',
            showEffects ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <ALargeSmall size={14} strokeWidth={2.2} />
          Effects
        </button>
        {showEffects && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-popover border border-border rounded-2xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-muted-foreground w-10 shrink-0">Case</span>
              <div className="flex items-center gap-1">
                {/* Title Case: Aa */}
                <button
                  onClick={() => applyCase('title')}
                  className="w-10 h-10 rounded-xl border border-primary bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold hover:bg-primary/20 transition-colors"
                  title="Title Case"
                >
                  Aa
                </button>
                {/* Lowercase: a↓ */}
                <button
                  onClick={() => applyCase('lower')}
                  className="w-10 h-10 rounded-xl border border-border text-muted-foreground flex items-center justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  title="lowercase"
                >
                  <span className="text-sm leading-none">a</span>
                  <ArrowDown size={10} strokeWidth={2.5} className="ml-0.5" />
                </button>
                {/* Uppercase: A↑ */}
                <button
                  onClick={() => applyCase('upper')}
                  className="w-10 h-10 rounded-xl border border-border text-muted-foreground flex flex-col items-center justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  title="UPPERCASE"
                >
                  <span className="text-sm font-bold leading-none">A</span>
                  <ArrowUp size={10} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side actions: delete */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              if (activeObject) {
                canvas?.remove(activeObject);
                canvas?.discardActiveObject();
                canvas?.renderAll();
              }
            }}
            className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 size={15} strokeWidth={2.2} />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={6}>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ContextToolbar;
