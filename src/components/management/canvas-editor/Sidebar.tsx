import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as fabric from 'fabric';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Type, Image as ImageIcon, Upload, Download, Shapes, Palette, LayoutPanelLeft, ChevronLeft, ChevronRight, Smartphone, Search, Pipette, Ban } from "lucide-react";
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

interface ShapeGraphic {
  id: string;
  type: 'rect' | 'circle' | 'triangle';
  color: string;
}

interface ImageGraphic {
  id: string;
  url: string;
  label: string;
}

interface SidebarProps {
  canvas: fabric.Canvas | null;
  canvasSize: { width: number; height: number };
  setCanvasSize: (size: { width: number; height: number }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ canvas, canvasSize, setCanvasSize }) => {
  const [activeTab, setActiveTab] = useState('graphics');
  const [isOpen, setIsOpen] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [bgInput, setBgInput] = useState('#ffffff');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<ImageGraphic[]>([]);
  
  // Mock data for graphics
  const [graphicsData, setGraphicsData] = useState<{
    shapes: ShapeGraphic[];
    images: ImageGraphic[];
    icons: ImageGraphic[];
    illustrations: ImageGraphic[];
  }>({
    shapes: [],
    images: [],
    icons: [],
    illustrations: []
  });

  // Fetch mock data
  useEffect(() => {
    // Simulate backend fetch
    const fetchData = async () => {
      // In real app: const response = await fetch('/api/graphics');
      const data: {
        shapes: ShapeGraphic[];
        images: ImageGraphic[];
        icons: ImageGraphic[];
        illustrations: ImageGraphic[];
      } = {
        shapes: [
          { id: 'rect', type: 'rect', color: '#000000' },
          { id: 'circle', type: 'circle', color: '#000000' },
          { id: 'triangle', type: 'triangle', color: '#000000' },
          { id: 'pentagon', type: 'rect', color: '#000000' }, // Simplified for mock
          { id: 'line', type: 'rect', color: '#000000' },
          { id: 'arrow', type: 'rect', color: '#000000' },
          { id: 'double-arrow', type: 'rect', color: '#000000' },
          { id: 'star', type: 'rect', color: '#000000' },
          { id: 'speech-bubble', type: 'rect', color: '#000000' },
          { id: 'speech-bubble-rect', type: 'rect', color: '#000000' },
        ],
        images: [
          { id: 'img1', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200', label: 'Watch' },
          { id: 'img2', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', label: 'Headphones' },
          { id: 'img3', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200', label: 'Shoes' },
          { id: 'img4', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', label: 'Nike' },
          { id: 'img5', url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200', label: 'Sneakers' },
          { id: 'img6', url: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=200', label: 'Blue Shoes' },
        ],
        icons: [
          { id: 'icon1', url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4ab.png', label: 'Star' },
          { id: 'icon2', url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f525.png', label: 'Fire' },
          { id: 'icon3', url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png', label: 'Sparkles' },
          { id: 'icon4', url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f308.png', label: 'Rainbow' },
          { id: 'icon5', url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f30a.png', label: 'Wave' },
          { id: 'icon6', url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26a1.png', label: 'Lightning' },
        ],
        illustrations: [
          { id: 'ill1', url: 'https://illustrations.popsy.co/amber/graphic-design.svg', label: 'Design' },
          { id: 'ill2', url: 'https://illustrations.popsy.co/amber/shaking-hands.svg', label: 'Hands' },
          { id: 'ill3', url: 'https://illustrations.popsy.co/amber/success.svg', label: 'Success' },
          { id: 'ill4', url: 'https://illustrations.popsy.co/amber/remote-work.svg', label: 'Work' },
          { id: 'ill5', url: 'https://illustrations.popsy.co/amber/web-design.svg', label: 'Web' },
          { id: 'ill6', url: 'https://illustrations.popsy.co/amber/launching-soon.svg', label: 'Launch' },
        ]
      };
      setGraphicsData(data);
      
      // Simulate backend fetch for uploaded images
      setUploadedImages([
        { id: 'up1', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200', label: 'Watch' },
        { id: 'up2', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', label: 'Headphones' },
        { id: 'up3', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200', label: 'Shoes' },
        { id: 'up4', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', label: 'Nike' },
      ]);
    };
    fetchData();
  }, []);

  const addShape = (type: string) => {
    if (!canvas) return;
    let shape;
    const common = {
      left: 100,
      top: 100,
      fill: '#000000',
      width: 100,
      height: 100,
    };

    if (type === 'rect') shape = new fabric.Rect(common);
    else if (type === 'circle') shape = new fabric.Circle({ ...common, radius: 50 });
    else if (type === 'triangle') shape = new fabric.Triangle(common);

    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    }
  };

  const addGraphic = (url: string) => {
    if (!canvas) return;
    fabric.FabricImage.fromURL(url, { crossOrigin: 'anonymous' }).then((img) => {
      img.scaleToWidth(150);
      img.set({
        left: 100,
        top: 100,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  };

  const filteredGraphics = {
    shapes: graphicsData.shapes.filter(s => s.type.toLowerCase().includes(searchQuery.toLowerCase())),
    images: graphicsData.images.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase())),
    icons: graphicsData.icons.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase())),
    illustrations: graphicsData.illustrations.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase())),
  };
  
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
          
          // Add to recently uploaded (local state simulation)
          const newUpload: ImageGraphic = {
            id: `up-local-${Date.now()}`,
            url: data,
            label: file.name
          };
          setUploadedImages(prev => [newUpload, ...prev].slice(0, 6));
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
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'uploads' && (
              <div className="space-y-8">
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#cc0000] hover:bg-[#b30000] text-white h-12 rounded-xl text-base font-semibold gap-2" 
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="h-5 w-5" /> Upload from this device
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-xl text-base font-semibold gap-2 border-border/60"
                  >
                    <Smartphone className="h-5 w-5" strokeWidth={2} />
                    Upload from phone
                  </Button>
                  <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#442222]">Recently uploaded</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {uploadedImages.map((img) => (
                      <div 
                        key={img.id} 
                        onClick={() => addGraphic(img.url)}
                        className="aspect-square bg-muted/30 rounded-2xl border border-dashed border-border/40 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-all overflow-hidden group shadow-sm"
                      >
                        <img 
                          src={img.url} 
                          alt={img.label} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/357886/image-broken.svg';
                          }}
                        />
                      </div>
                    ))}
                    {/* Add empty slots to match the screenshot look if there are few images */}
                    {uploadedImages.length < 6 && Array.from({ length: 6 - uploadedImages.length }).map((_, i) => (
                      <div 
                        key={`empty-${i}`} 
                        className="aspect-square bg-muted/20 rounded-2xl border border-dashed border-border/30 flex items-center justify-center"
                      />
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
                {!activeCategory ? (
                  <>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search graphics..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="space-y-6">
                      {/* Shapes */}
                      <div className="space-y-3">
                        <div 
                          className="flex items-center justify-between cursor-pointer group"
                          onClick={() => setActiveCategory('Shapes')}
                        >
                          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Shapes</h3>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {filteredGraphics.shapes.slice(0, 3).map((shape) => (
                            <div 
                              key={shape.id} 
                              onClick={() => addShape(shape.type)}
                              className="aspect-square bg-muted rounded-lg border border-border/50 hover:border-primary/30 transition-all cursor-pointer flex items-center justify-center p-4 group shadow-sm hover:shadow-md"
                            >
                              <div className={cn(
                                "bg-black group-hover:scale-110 transition-transform duration-200",
                                shape.type === 'rect' && "w-full h-full rounded-sm",
                                shape.type === 'circle' && "w-full h-full rounded-full",
                              )} 
                              style={shape.type === 'triangle' ? { 
                                width: 0, 
                                height: 0, 
                                borderLeft: '24px solid transparent', 
                                borderRight: '24px solid transparent', 
                                borderBottom: '40px solid black',
                                backgroundColor: 'transparent'
                              } : {}}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center gap-1.5 pt-1">
                          <div className="w-6 h-2 bg-primary rounded-full" />
                          {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-muted rounded-full" />)}
                        </div>
                      </div>

                      {/* Images */}
                      <div className="space-y-3">
                        <div 
                          className="flex items-center justify-between cursor-pointer group"
                          onClick={() => setActiveCategory('Images')}
                        >
                          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Images</h3>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {filteredGraphics.images.slice(0, 3).map((img) => (
                            <div 
                              key={img.id} 
                              onClick={() => addGraphic(img.url)}
                              className="aspect-square bg-muted rounded-lg border border-border/50 hover:border-primary/30 transition-all cursor-pointer overflow-hidden group shadow-sm hover:shadow-md"
                            >
                              <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center gap-1.5 pt-1">
                          <div className="w-6 h-2 bg-primary rounded-full" />
                          {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-muted rounded-full" />)}
                        </div>
                      </div>

                      {/* Icons */}
                      <div className="space-y-3">
                        <div 
                          className="flex items-center justify-between cursor-pointer group"
                          onClick={() => setActiveCategory('Icons')}
                        >
                          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Icons</h3>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {filteredGraphics.icons.slice(0, 3).map((icon) => (
                            <div 
                              key={icon.id} 
                              onClick={() => addGraphic(icon.url)}
                              className="aspect-square bg-muted rounded-lg border border-border/50 hover:border-primary/30 transition-all cursor-pointer flex items-center justify-center p-3 group shadow-sm hover:shadow-md"
                            >
                              <img 
                                src={icon.url} 
                                alt={icon.label} 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/357886/image-broken.svg';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center gap-1.5 pt-1">
                          <div className="w-6 h-2 bg-primary rounded-full" />
                          {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-muted rounded-full" />)}
                        </div>
                      </div>

                      {/* Illustrations */}
                      <div className="space-y-3">
                        <div 
                          className="flex items-center justify-between cursor-pointer group"
                          onClick={() => setActiveCategory('Illustrations')}
                        >
                          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Illustrations</h3>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {filteredGraphics.illustrations.slice(0, 3).map((ill) => (
                            <div 
                              key={ill.id} 
                              onClick={() => addGraphic(ill.url)}
                              className="aspect-square bg-muted rounded-lg border border-border/50 hover:border-primary/30 transition-all cursor-pointer flex items-center justify-center p-2 group shadow-sm hover:shadow-md overflow-hidden"
                            >
                              <img 
                                src={ill.url} 
                                alt={ill.label} 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/357886/image-broken.svg';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center gap-1.5 pt-1">
                          <div className="w-6 h-2 bg-primary rounded-full" />
                          {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-muted rounded-full" />)}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-2">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full hover:bg-muted"
                          onClick={() => setActiveCategory(null)}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <h3 className="text-lg font-semibold">{activeCategory}</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {activeCategory === 'Shapes' && filteredGraphics.shapes.map((shape) => (
                        <div 
                          key={shape.id} 
                          onClick={() => addShape(shape.type)}
                          className="aspect-square bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all cursor-pointer flex items-center justify-center p-4 group shadow-sm hover:shadow-md"
                        >
                          <div className={cn(
                            "bg-black group-hover:scale-110 transition-transform duration-200",
                            shape.id === 'rect' && "w-full h-full rounded-sm",
                            shape.id === 'circle' && "w-full h-full rounded-full",
                            shape.id === 'triangle' && "w-0 h-0 border-l-20 border-l-transparent border-r-20 border-r-transparent border-bottom-[32px] border-bottom-black",
                            shape.id === 'pentagon' && "w-[80%] h-[80%] [clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]",
                            shape.id === 'line' && "w-full h-1 rotate-45",
                            shape.id === 'arrow' && "w-full h-full [clip-path:polygon(0%_35%,60%_35%,60%_0%,100%_50%,60%_100%,60%_65%,0%_65%)]",
                            shape.id === 'double-arrow' && "w-full h-full [clip-path:polygon(0%_50%,25%_0%,25%_35%,75%_35%,75%_0%,100%_50%,75%_100%,75%_65%,25%_65%,25%_100%)]",
                            shape.id === 'star' && "w-full h-full [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]",
                            shape.id === 'speech-bubble' && "w-full h-full [clip-path:polygon(0%_0%,100%_0%,100%_75%,50%_75%,25%_100%,25%_75%,0%_75%)] rounded-full",
                            shape.id === 'speech-bubble-rect' && "w-full h-full [clip-path:polygon(0%_0%,100%_0%,100%_75%,40%_75%,20%_100%,20%_75%,0%_75%)] rounded-sm",
                          )} 
                          style={shape.id === 'triangle' ? { 
                            width: 0, 
                            height: 0, 
                            borderLeft: '20px solid transparent', 
                            borderRight: '20px solid transparent', 
                            borderBottom: '32px solid black',
                            backgroundColor: 'transparent'
                          } : {}}
                          />
                        </div>
                      ))}

                      {activeCategory === 'Images' && filteredGraphics.images.map((img) => (
                        <div 
                          key={img.id} 
                          onClick={() => addGraphic(img.url)}
                          className="aspect-square bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all cursor-pointer overflow-hidden group shadow-sm hover:shadow-md"
                        >
                          <img 
                            src={img.url} 
                            alt={img.label} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/357886/image-broken.svg';
                            }}
                          />
                        </div>
                      ))}

                      {activeCategory === 'Icons' && filteredGraphics.icons.map((icon) => (
                        <div 
                          key={icon.id} 
                          onClick={() => addGraphic(icon.url)}
                          className="aspect-square bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all cursor-pointer flex items-center justify-center p-3 group shadow-sm hover:shadow-md"
                        >
                          <img 
                            src={icon.url} 
                            alt={icon.label} 
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/357886/image-broken.svg';
                            }}
                          />
                        </div>
                      ))}

                      {activeCategory === 'Illustrations' && filteredGraphics.illustrations.map((ill) => (
                        <div 
                          key={ill.id} 
                          onClick={() => addGraphic(ill.url)}
                          className="aspect-square bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all cursor-pointer flex items-center justify-center p-2 group shadow-sm hover:shadow-md overflow-hidden"
                        >
                          <img 
                            src={ill.url} 
                            alt={ill.label} 
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/357886/image-broken.svg';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
