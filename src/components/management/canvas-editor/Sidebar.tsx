import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as fabric from 'fabric';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Type, Image as ImageIcon, Upload, Download, Shapes, Palette, MoreHorizontal, LayoutPanelLeft, ChevronLeft, ChevronRight, Minimize2, Smartphone, Search, Pipette, Ban } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper functions for color conversion
const hsvToHex = (h: number, s: number, v: number) => {
  s /= 100;
  v /= 100;
  const i = Math.floor(h / 60);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const hexToHsv = (hex: string) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16) / 255;
    g = parseInt(hex[2] + hex[2], 16) / 255;
    b = parseInt(hex[3] + hex[3], 16) / 255;
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16) / 255;
    g = parseInt(hex.substring(3, 5), 16) / 255;
    b = parseInt(hex.substring(5, 7), 16) / 255;
  }
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
};

interface SidebarProps {
  canvas: fabric.Canvas | null;
  canvasSize: { width: number; height: number };
  setCanvasSize: (size: { width: number; height: number }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ canvas, canvasSize, setCanvasSize }) => {
  const [activeTab, setActiveTab] = useState('uploads');
  const [isOpen, setIsOpen] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [bgInput, setBgInput] = useState('#ffffff');
  
  // Color picker state
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 100 });
  const [isDraggingGradient, setIsDraggingGradient] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);
  
  const colorInputRef = useRef<HTMLInputElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 'product', icon: LayoutPanelLeft, label: 'Product options' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'uploads', icon: ImageIcon, label: 'Uploads' },
    { id: 'graphics', icon: Shapes, label: 'Graphics' },
    { id: 'background', icon: Palette, label: 'Background' },
    { id: 'more', icon: MoreHorizontal, label: 'More' },
  ];

  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#00FFFF', '#FF00FF', '#C0C0C0', '#808080', '#800000', '#808000',
    '#008000', '#800080', '#008080', '#000080', '#FFA500', '#A52A2A'
  ];

  // Update HSV when bgInput changes (from external sources)
  useEffect(() => {
    if (!isDraggingGradient && !isDraggingHue && /^#[0-9A-F]{3,6}$/i.test(bgInput)) {
      const newHsv = hexToHsv(bgInput);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHsv(newHsv);
    }
  }, [bgInput, isDraggingGradient, isDraggingHue]);

  const handleBgChange = useCallback((color: string) => {
    if (!canvas) return;
    canvas.set({ backgroundColor: color });
    canvas.renderAll();
    setBgInput(color);
  }, [canvas]);

  const handleColorClick = () => {
    colorInputRef.current?.click();
  };

  // Gradient dragging logic
  const handleGradientMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!gradientRef.current) return;
    const rect = gradientRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    const newS = x * 100;
    const newV = (1 - y) * 100;
    
    setHsv(prev => {
      const updated = { ...prev, s: newS, v: newV };
      const hex = hsvToHex(updated.h, updated.s, updated.v);
      handleBgChange(hex);
      return updated;
    });
  }, [handleBgChange]);

  // Hue dragging logic
  const handleHueMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    const newH = x * 360;
    
    setHsv(prev => {
      const updated = { ...prev, h: newH };
      const hex = hsvToHex(updated.h, updated.s, updated.v);
      handleBgChange(hex);
      return updated;
    });
  }, [handleBgChange]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingGradient) handleGradientMove(e);
      if (isDraggingHue) handleHueMove(e);
    };

    const handleMouseUp = () => {
      setIsDraggingGradient(false);
      setIsDraggingHue(false);
    };

    if (isDraggingGradient || isDraggingHue) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingGradient, isDraggingHue, handleGradientMove, handleHueMove]);

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.Textbox(textInput || 'Add Your Text', {
      left: 100,
      top: 100,
      width: 250,
      fontFamily: 'Arimo',
      fontSize: 28,
      fill: '#000000',
      textAlign: 'left',
      lockScalingFlip: true,
      minWidth: 10,
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setTextInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    // Reset input value to allow selecting the same file again
    e.target.value = '';
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (typeof data === 'string') {
        fabric.FabricImage.fromURL(data).then((img) => {
          img.scaleToWidth(200);
          img.set({
            left: 100,
            top: 100,
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSizeChange = (dim: 'width' | 'height', val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCanvasSize({ ...canvasSize, [dim]: num });
    }
  };

  return (
    <div className="flex h-full z-20 shrink-0">
      {/* Vertical Icon Menu */}
      <div className="w-20 bg-card border-r flex flex-col items-center py-4 gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsOpen(true);
            }}
            className={cn(
              "w-full flex flex-col items-center py-3 gap-1 transition-colors relative",
              activeTab === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {activeTab === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r" />
            )}
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium text-center px-1 leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Collapsible Content Panel */}
      {isOpen && (
        <div className="w-72 bg-card border-r flex flex-col relative shadow-xl">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-card border border-l-0 rounded-r-md flex items-center justify-center hover:bg-muted transition-colors z-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="font-semibold text-lg capitalize">{activeTab.replace('-', ' ')}</h2>
            <button className="p-1 hover:bg-muted rounded text-muted-foreground">
              <Minimize2 size={16} strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'uploads' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Button className="w-full" onClick={() => document.getElementById('image-upload')?.click()}>
                    <Upload /> Upload from this device
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Smartphone className="h-4 w-4 mr-2" strokeWidth={2} />
                    Upload from phone
                  </Button>
                  <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Recently uploaded</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-muted rounded border border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden group">
                        <div className="w-full h-full bg-muted/50 group-hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Edit your text below, or click on the field you'd like to edit directly on your design.
                  </p>
                  <div className="space-y-2">
                    <Input 
                      placeholder="Enter your text here..." 
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addText()}
                    />
                  </div>
                  <Button className="w-full" onClick={addText}>
                    New Text Field
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'graphics' && (
              <div className="space-y-6">
                <div className="relative">
                  <Input placeholder="Search for content" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={2} />
                </div>

                {['Shapes', 'Images', 'Icons', 'Illustrations'].map((category) => (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">{category}</h3>
                      <ChevronRight className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square bg-muted rounded hover:bg-muted/80 transition-colors cursor-pointer" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'background' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Background color</h3>
                  
                  {/* Inline Color Picker Area matching 2nd screenshot */}
                  <div className="space-y-5">
                    <div 
                      ref={gradientRef}
                      className="aspect-video w-full relative cursor-crosshair group"
                      onMouseDown={(e) => {
                        setIsDraggingGradient(true);
                        handleGradientMove(e);
                      }}
                    >
                      {/* Gradient Background with rounding */}
                      <div 
                        className="absolute inset-0 rounded-xl border border-muted/20 overflow-hidden shadow-sm"
                        style={{ 
                          background: `
                            linear-gradient(to bottom, transparent, #000),
                            linear-gradient(to right, #fff, transparent),
                            ${hsvToHex(hsv.h, 100, 100)}
                          `,
                          backgroundBlendMode: 'multiply, normal'
                        }}
                      />
                      
                      {/* Selection indicator - placed outside the overflow-hidden div to prevent clipping */}
                      <div 
                        className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_4px_rgba(0,0,0,0.3)] pointer-events-none z-10"
                        style={{ 
                          left: `${hsv.s}%`, 
                          top: `${100 - hsv.v}%` 
                        }}
                      />
                    </div>

                    {/* Hue Slider */}
                    <div className="px-0.5">
                      <div 
                        ref={hueRef}
                        className="h-2 w-full rounded-full relative cursor-pointer"
                        style={{ 
                          background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' 
                        }}
                        onMouseDown={(e) => {
                          setIsDraggingHue(true);
                          handleHueMove(e);
                        }}
                      >
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.3)] cursor-grab active:cursor-grabbing pointer-events-none transition-transform hover:scale-110" 
                          style={{ 
                            left: `${(hsv.h / 360) * 100}%`,
                            backgroundColor: hsvToHex(hsv.h, hsv.s, hsv.v)
                          }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hidden native color input */}
                  <input 
                    type="color" 
                    ref={colorInputRef} 
                    className="hidden" 
                    value={bgInput}
                    onChange={(e) => handleBgChange(e.target.value)}
                  />
                  
                  <div className="flex items-center gap-2 pt-1">
                    <div className="relative flex-1">
                      <Input 
                        placeholder="Hex color" 
                        className="bg-background border-muted/30 h-10 pl-3 font-mono text-sm rounded-lg focus-visible:ring-1 focus-visible:ring-primary/20 uppercase" 
                        value={bgInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBgInput(val);
                          if (/^#[0-9A-F]{3,6}$/i.test(val)) {
                            handleBgChange(val);
                          }
                        }}
                      />
                    </div>
                    <button 
                      className="w-10 h-10 flex items-center justify-center border border-muted/30 rounded-lg hover:bg-muted/10 transition-colors" 
                      title="Open color picker"
                      onClick={handleColorClick}
                    >
                      <Pipette size={18} />
                    </button>
                    <button 
                      className="w-10 h-10 flex items-center justify-center border border-muted/30 rounded-lg hover:bg-muted/10 text-destructive/80 transition-colors" 
                      title="Clear background"
                      onClick={() => handleBgChange('#ffffff')}
                    >
                      <Ban size={18} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent colors</h4>
                    <div className="flex gap-2">
                      <div 
                        className="w-8 h-8 rounded-full border bg-black cursor-pointer" 
                        onClick={() => handleBgChange('#000000')}
                      />
                      <div 
                        className="w-8 h-8 rounded-full border bg-white cursor-pointer" 
                        onClick={() => handleBgChange('#ffffff')}
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
                          onClick={() => handleBgChange(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'product' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Canvas Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (in)</Label>
                    <Input
                      id="width"
                      type="number"
                      step="0.1"
                      value={canvasSize.width}
                      onChange={(e) => handleSizeChange('width', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (in)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      value={canvasSize.height}
                      onChange={(e) => handleSizeChange('height', e.target.value)}
                    />
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                    <Download className="h-4 w-4 mr-2" /> Save to JSON
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Re-open button when closed */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-6 h-12 bg-card border border-l-0 rounded-r-md flex items-center justify-center hover:bg-muted transition-colors absolute left-20 top-1/2 -translate-y-1/2 z-30 shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
