import React from 'react';
import { Input } from "@/components/ui/input";
import { Pipette, Ban } from "lucide-react";
import { hsvToHex } from './utils';

interface BackgroundTabProps {
  hsv: { h: number; s: number; v: number };
  gradientRef: React.RefObject<HTMLDivElement | null>;
  hueRef: React.RefObject<HTMLDivElement | null>;
  colorInputRef: React.RefObject<HTMLInputElement | null>;
  bgInput: string;
  onBgInputUpdate: (val: string) => void;
  onBgChange: (color: string) => void;
  onColorClick: () => void;
  onGradientMouseDown: (e: React.MouseEvent) => void;
  onHueMouseDown: (e: React.MouseEvent) => void;
  presetColors: string[];
}

export const BackgroundTab: React.FC<BackgroundTabProps> = ({
  hsv,
  gradientRef,
  hueRef,
  colorInputRef,
  bgInput,
  onBgInputUpdate,
  onBgChange,
  onColorClick,
  onGradientMouseDown,
  onHueMouseDown,
  presetColors,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold mb-2">Background color</h3>
        
        <div className="space-y-6">
          <div className="relative">
            <div 
              ref={gradientRef}
              className="aspect-video w-full relative cursor-crosshair group rounded-xl border border-muted/20 shadow-sm"
              onMouseDown={onGradientMouseDown}
            >
              <div 
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{ 
                  background: `
                    linear-gradient(to bottom, transparent, #000),
                    linear-gradient(to right, #fff, transparent),
                    ${hsvToHex(hsv.h, 100, 100)}
                  `,
                  backgroundBlendMode: 'multiply, normal'
                }}
              />
              
              <div 
                className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_4px_rgba(0,0,0,0.3)] pointer-events-none z-10"
                style={{ 
                  left: `${Math.max(4, Math.min(96, hsv.s))}%`, 
                  top: `${Math.max(8, Math.min(92, 100 - hsv.v))}%` 
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <div 
              ref={hueRef}
              className="h-2.5 w-full rounded-full relative cursor-pointer"
              style={{ 
                background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' 
              }}
              onMouseDown={onHueMouseDown}
            >
              <div 
                className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.3)] cursor-grab active:cursor-grabbing pointer-events-none transition-transform hover:scale-110" 
                style={{ 
                  left: `${Math.max(4, Math.min(96, (hsv.h / 360) * 100))}%`,
                  backgroundColor: hsvToHex(hsv.h, hsv.s, hsv.v),
                  transform: 'translate(-50%, -50%)'
                }} 
              />
            </div>
          </div>
        </div>

        <input 
          type="color" 
          ref={colorInputRef} 
          className="hidden" 
          value={bgInput}
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            onBgChange(val);
          }}
        />
        
        <div className="flex items-center gap-2 pt-1">
          <div className="relative flex-1">
            <Input 
              placeholder="Hex color" 
              className="bg-background border-muted/30 h-10 pl-3 font-mono text-sm rounded-lg focus-visible:ring-1 focus-visible:ring-primary/20 uppercase" 
              value={bgInput}
              onChange={(e) => {
                const val = e.target.value;
                onBgInputUpdate(val);
                if (/^#[0-9A-F]{3,6}$/i.test(val)) {
                  onBgChange(val);
                }
              }}
            />
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center border border-muted/30 rounded-lg hover:bg-muted/10 transition-colors" 
            title="Open color picker"
            onClick={onColorClick}
          >
            <Pipette size={18} />
          </button>
          <button 
            className="w-10 h-10 flex items-center justify-center border border-muted/30 rounded-lg hover:bg-muted/10 text-destructive/80 transition-colors" 
            title="Clear background"
            onClick={() => onBgChange('#ffffff')}
          >
            <Ban size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent colors</h4>
          <div className="flex gap-2">
            <div 
              className="w-8 h-8 rounded-full border bg-black cursor-pointer" 
              onClick={() => onBgChange('#000000')}
            />
            <div 
              className="w-8 h-8 rounded-full border bg-white cursor-pointer" 
              onClick={() => onBgChange('#ffffff')}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pre-set colors</h4>
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((color, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-full border cursor-pointer hover:scale-110 transition-transform" 
                style={{ backgroundColor: color }}
                onClick={() => onBgChange(color)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
