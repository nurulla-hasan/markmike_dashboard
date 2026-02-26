/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import * as fabric from 'fabric';
import Sidebar from './Sidebar';
import ContextToolbar from './ContextToolbar';
import CanvasBoard from './CanvasBoard';
import { Settings2, ChevronRight, Minus, Plus, X, Check, Keyboard } from 'lucide-react';
import { cn } from "@/lib/utils";

const EditorContainer = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.FabricObject | null>(null);
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
  const [sidesData, setSidesData] = useState<Record<'front' | 'back', any>>({ front: null, back: null });
  const [canvasSize, setCanvasSize] = useState({ width: 8.5, height: 11 }); // Inches
  const [zoom, setZoom] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    rulers: true,
    grids: false,
    highlightEmptyText: true
  });

  const onCanvasInit = useCallback((canvasInstance: fabric.Canvas) => {
    setCanvas(canvasInstance);
    
    const updateActiveObject = () => {
      const active = canvasInstance.getActiveObject();
      setActiveObject(active || null);
    };

    canvasInstance.on('selection:created', updateActiveObject);
    canvasInstance.on('selection:updated', updateActiveObject);
    canvasInstance.on('selection:cleared', () => setActiveObject(null));
    canvasInstance.on('object:modified', updateActiveObject);
  }, []);

  const handleSideSwitch = async (newSide: 'front' | 'back') => {
    if (!canvas || currentSide === newSide) return;

    // Save current side data
    const json = canvas.toJSON();
    setSidesData(prev => ({ ...prev, [currentSide]: json }));

    // Update active side
    setCurrentSide(newSide);
    setActiveObject(null); // Clear selection

    // Load new side data
    const nextData = sidesData[newSide];
    
    if (nextData) {
      await canvas.loadFromJSON(nextData);
    } else {
      canvas.clear();
      canvas.set({ backgroundColor: '#ffffff' });
    }
    
    canvas.renderAll();
  };

  useEffect(() => {
    if (!canvas) return;

    const highlightEmpty = () => {
      canvas.getObjects().forEach(obj => {
        if (obj instanceof fabric.IText && !obj.text?.trim()) {
          obj.set({
            backgroundColor: settings.highlightEmptyText ? 'rgba(255, 0, 0, 0.05)' : 'transparent',
            stroke: settings.highlightEmptyText ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
            strokeDashArray: settings.highlightEmptyText ? [4, 4] : undefined
          });
        } else if (obj instanceof fabric.IText) {
          obj.set({
            backgroundColor: 'transparent',
            stroke: 'transparent',
            strokeDashArray: undefined
          });
        }
      });
      canvas.renderAll();
    };

    highlightEmpty();
    canvas.on('text:changed', highlightEmpty);
    canvas.on('object:added', highlightEmpty);
    
    return () => {
      canvas.off('text:changed', highlightEmpty);
      canvas.off('object:added', highlightEmpty);
    };
  }, [canvas, settings.highlightEmptyText]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] w-full overflow-hidden border rounded-xl">
      {/* Context Toolbar */}
      <div className="relative h-16 border-b flex items-center px-4 bg-background z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)] border-border">
        <ContextToolbar 
          canvas={canvas} 
          activeObject={activeObject} 
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar and Tools Panel */}
        <Sidebar 
          canvas={canvas} 
          canvasSize={canvasSize} 
          setCanvasSize={setCanvasSize} 
        />

        {/* Main Canvas Area */}
        <div className="flex-1 relative bg-muted/20 overflow-hidden flex flex-col">


          {/* Canvas Viewport */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <CanvasBoard 
              canvasSize={canvasSize} 
              onCanvasInit={onCanvasInit} 
              zoom={zoom}
              setZoom={setZoom}
              activeObject={activeObject}
              settings={settings}
            />
            
          </div>

          {/* Floating Bottom Zoom Control Bar */}
          <div className="absolute bottom-8 right-8 z-30">
            <div className="bg-background rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border flex items-center px-4 py-2 gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setZoom(prev => prev * 0.9)}
                  className="p-1 hover:bg-muted rounded-md text-muted-foreground transition-colors"
                >
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <span className="text-sm font-semibold text-foreground min-w-11.25 text-center">{Math.round(zoom * 100)}%</span>
                <button 
                  onClick={() => setZoom(prev => prev * 1.1)}
                  className="p-1 hover:bg-muted rounded-md text-muted-foreground transition-colors"
                >
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>
              
              <div className="w-px h-4 bg-border" />
              
              <div className="relative">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className={cn(
                    "p-1 rounded-md transition-colors",
                    showSettings ? "bg-muted text-foreground" : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <Settings2 className="h-4 w-4" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-full mb-4 right-0 w-64 bg-background rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-border overflow-hidden py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="px-4 py-2 flex items-center justify-between border-b border-border/50 mb-1">
                      <span className="text-sm font-bold text-foreground">Settings</span>
                      <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-foreground">
                        <X size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                    
                    {[
                      { id: 'rulers', label: 'Rulers' },
                      { id: 'grids', label: 'Grids' },
                      { id: 'highlightEmptyText', label: 'Highlight empty text' },
                    ].map((item) => (
                      <div key={item.id} className="px-4 py-2.5 flex items-center justify-between hover:bg-muted cursor-pointer transition-colors group" onClick={() => setSettings(s => ({ ...s, [item.id]: !s[item.id as keyof typeof settings] }))}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground/80">{item.label}</span>
                        </div>
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-all",
                          settings[item.id as keyof typeof settings] ? "bg-primary border-primary" : "border-border group-hover:border-muted-foreground/50"
                        )}>
                          {settings[item.id as keyof typeof settings] && <Check size={10} strokeWidth={4} color="white" />}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-2 px-2 border-t border-border/50 pt-2">
                      <button className="w-full flex items-center justify-between px-2 py-2 hover:bg-muted rounded-md transition-colors text-left">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                            <Keyboard size={14} strokeWidth={2} />
                          </div>
                          <span className="text-sm font-medium text-foreground/80">Keyboard Shortcuts</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Previews (Front/Back) */}
        <div className="w-24 h-full border-l bg-background flex flex-col items-center py-8 gap-8 z-20 shrink-0 shadow-[-1px_0_0_0_rgba(0,0,0,0.05)] border-border">
          <div 
            className={cn(
              "flex flex-col items-center gap-3 group cursor-pointer transition-all",
              currentSide === 'front' ? "opacity-100" : "opacity-40 hover:opacity-100"
            )}
            onClick={() => handleSideSwitch('front')}
          >
            <div className={cn(
              "w-14 h-20 border-2 bg-background rounded shadow-[0_4px_10px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden transition-all",
              currentSide === 'front' ? "border-primary shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)]" : "border-transparent group-hover:shadow-[0_4px_10px_-2px_rgba(0,0,0,0.1)]"
            )}>
              <div className="w-full h-full bg-muted/50" />
            </div>
            <span className={cn(
              "text-[11px] font-bold transition-colors",
              currentSide === 'front' ? "text-primary" : "text-muted-foreground"
            )}>Front</span>
          </div>
          
          <div 
            className={cn(
              "flex flex-col items-center gap-3 group cursor-pointer transition-all",
              currentSide === 'back' ? "opacity-100" : "opacity-40 hover:opacity-100"
            )}
            onClick={() => handleSideSwitch('back')}
          >
            <div className={cn(
              "w-14 h-20 border-2 bg-background rounded shadow-[0_4px_10px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden transition-all",
              currentSide === 'back' ? "border-primary shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)]" : "border-transparent group-hover:shadow-[0_4px_10px_-2px_rgba(0,0,0,0.1)]"
            )}>
              <div className="w-full h-full bg-muted/50" />
            </div>
            <span className={cn(
              "text-[11px] font-bold transition-colors",
              currentSide === 'back' ? "text-primary" : "text-muted-foreground"
            )}>Back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorContainer;