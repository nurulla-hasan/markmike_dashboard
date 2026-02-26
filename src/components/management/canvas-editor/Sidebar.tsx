import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as fabric from 'fabric';
import { LayoutPanelLeft, Type, Image as ImageIcon, Shapes, Palette, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadsTab } from './sidebar/UploadsTab';
import { TextTab } from './sidebar/TextTab';
import { GraphicsTab } from './sidebar/GraphicsTab';
import { BackgroundTab } from './sidebar/BackgroundTab';
import { ProductTab } from './sidebar/ProductTab';
import type { ShapeGraphic, ImageGraphic } from './sidebar/types';
import { hsvToHex, hexToHsv } from './sidebar/utils';

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
          { id: 'pentagon', type: 'pentagon', color: '#000000' },
          { id: 'line', type: 'line', color: '#000000' },
          { id: 'arrow', type: 'arrow', color: '#000000' },
          { id: 'double-arrow', type: 'double-arrow', color: '#000000' },
          { id: 'star', type: 'star', color: '#000000' },
          { id: 'speech-bubble', type: 'speech-bubble', color: '#000000' },
          { id: 'speech-bubble-rect', type: 'speech-bubble-rect', color: '#000000' },
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
    else if (type === 'star') {
      const points = [
        { x: 50, y: 0 },
        { x: 61, y: 35 },
        { x: 98, y: 35 },
        { x: 68, y: 57 },
        { x: 79, y: 91 },
        { x: 50, y: 70 },
        { x: 21, y: 91 },
        { x: 32, y: 57 },
        { x: 2, y: 35 },
        { x: 39, y: 35 },
      ];
      shape = new fabric.Polygon(points, { ...common, width: undefined, height: undefined });
    }
    else if (type === 'pentagon') {
      const points = [
        { x: 50, y: 0 },
        { x: 100, y: 38 },
        { x: 82, y: 100 },
        { x: 18, y: 100 },
        { x: 0, y: 38 },
      ];
      shape = new fabric.Polygon(points, { ...common, width: undefined, height: undefined });
    }
    else if (type === 'line') {
      shape = new fabric.Rect({ ...common, height: 2 });
    }
    else if (type === 'arrow') {
      const points = [
        { x: 0, y: 35 },
        { x: 60, y: 35 },
        { x: 60, y: 0 },
        { x: 100, y: 50 },
        { x: 60, y: 100 },
        { x: 60, y: 65 },
        { x: 0, y: 65 },
      ];
      shape = new fabric.Polygon(points, { ...common, width: undefined, height: undefined });
    }
    else if (type === 'double-arrow') {
      const points = [
        { x: 0, y: 50 },
        { x: 25, y: 0 },
        { x: 25, y: 35 },
        { x: 75, y: 35 },
        { x: 75, y: 0 },
        { x: 100, y: 50 },
        { x: 75, y: 100 },
        { x: 75, y: 65 },
        { x: 25, y: 65 },
        { x: 25, y: 100 },
      ];
      shape = new fabric.Polygon(points, { ...common, width: undefined, height: undefined });
    }
    else if (type === 'speech-bubble') {
      // For simplicity using a path for speech bubble
      shape = new fabric.Path('M 0 0 H 100 V 75 H 50 L 25 100 V 75 H 0 Z', { ...common, width: undefined, height: undefined });
    }
    else if (type === 'speech-bubble-rect') {
      shape = new fabric.Path('M 0 0 H 100 V 75 H 40 L 20 100 V 75 H 0 Z', { ...common, width: undefined, height: undefined });
    }

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
      // Only update if the color is actually different to avoid rubber-banding
      const currentHex = hsvToHex(hsv.h, hsv.s, hsv.v).toUpperCase();
      if (currentHex !== bgInput.toUpperCase()) {
        setHsv(newHsv);
      }
    }
  }, [bgInput, isDraggingGradient, isDraggingHue, hsv]);

  const handleBgChange = useCallback((color: string) => {
    if (!canvas) return;
    canvas.set({ backgroundColor: color });
    canvas.renderAll();
    setBgInput(color.toUpperCase());
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
    
    setHsv(prev => ({ ...prev, s: newS, v: newV }));
    
    const hex = hsvToHex(hsv.h, newS, newV);
    handleBgChange(hex);
  }, [handleBgChange, hsv.h]);

  // Hue dragging logic
  const handleHueMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    const newH = x * 360;
    
    setHsv(prev => ({ ...prev, h: newH }));
    
    const hex = hsvToHex(newH, hsv.s, hsv.v);
    handleBgChange(hex);
  }, [handleBgChange, hsv.s, hsv.v]);

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
              <UploadsTab 
                uploadedImages={uploadedImages} 
                onUpload={handleImageUpload} 
                onAddGraphic={addGraphic} 
              />
            )}

            {activeTab === 'text' && (
              <TextTab 
                textInput={textInput} 
                onTextInputChange={setTextInput} 
                onAddText={addText} 
              />
            )}

            {activeTab === 'graphics' && (
              <GraphicsTab 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                filteredGraphics={filteredGraphics}
                onAddShape={addShape}
                onAddGraphic={addGraphic}
              />
            )}

            {activeTab === 'background' && (
              <BackgroundTab 
                hsv={hsv}
                gradientRef={gradientRef}
                hueRef={hueRef}
                colorInputRef={colorInputRef}
                bgInput={bgInput}
                onBgInputUpdate={setBgInput}
                onBgChange={handleBgChange}
                onColorClick={handleColorClick}
                onGradientMouseDown={() => setIsDraggingGradient(true)}
                onHueMouseDown={() => setIsDraggingHue(true)}
                presetColors={presetColors}
              />
            )}

            {activeTab === 'product' && (
              <ProductTab 
                canvasSize={canvasSize} 
                onSizeChange={handleSizeChange} 
              />
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
