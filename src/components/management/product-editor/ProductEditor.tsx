import { useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeftToolbar } from "./LeftToolbar";
import { RightPanel } from "./RightPanel";
import { BottomActionBar } from "./BottomActionBar";
import { ToolPanel } from "./ToolPanel";
import { KonvaCanvas, type CanvasObject } from "./KonvaCanvas";
import { EditObjectPanel } from "./EditObjectPanel";

export type ToolType = "upload" | "text" | "art" | "details" | "names" | null;

export interface ProductView {
  id: string;
  label: string;
  image: string;
}

export const ProductEditor = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [activeView, setActiveView] = useState<string>("front");
  const [zoom, setZoom] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [canvasObjects, setCanvasObjects] = useState<CanvasObject[]>([]);
  const [placeTextRequest, setPlaceTextRequest] = useState<{ id: string; text?: string } | null>(null);

  const productViews: ProductView[] = [
    { id: "front", label: "Front", image: "/front.png" },
    { id: "back", label: "Back", image: "/back.png" },
    { id: "L sleeve", label: "L Sleeve", image: "/L sleeve.png" },
    { id: "R sleeve", label: "R Sleeve", image: "/R sleeve.png" },
  ];

  const handleToolClick = (tool: ToolType) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-xl border bg-white overflow-hidden shadow-sm">
      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <LeftToolbar 
          activeTool={activeTool} 
          onToolClick={handleToolClick} 
        />

        {/* Tool Panel or Edit Panel */}
        {selectedId && canvasObjects.find(obj => obj.id === selectedId) ? (
          <EditObjectPanel
            object={canvasObjects.find(obj => obj.id === selectedId)!}
            objects={canvasObjects}
            onClose={() => setSelectedId(null)}
            onUpdate={(id, updates) => {
              setCanvasObjects(prev => prev.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
            }}
            onDelete={(id) => {
              setCanvasObjects(prev => prev.filter(obj => obj.id !== id));
              setSelectedId(null);
            }}
            onDuplicate={(id) => {
              const obj = canvasObjects.find(o => o.id === id);
              if (obj) {
                const newObj = { ...obj, id: `${obj.type}-${Date.now()}`, x: obj.x + 20, y: obj.y + 20 };
                setCanvasObjects(prev => [...prev, newObj]);
                setSelectedId(newObj.id);
              }
            }}
            onReorder={(id, direction) => {
              setCanvasObjects(prev => {
                const index = prev.findIndex(obj => obj.id === id);
                if (index === -1) return prev;
                const newObjects = [...prev];
                const [obj] = newObjects.splice(index, 1);
                const newIndex = direction === 'up' ? newObjects.length : Math.max(0, index - 1);
                newObjects.splice(newIndex, 0, obj);
                return newObjects;
              });
            }}
            onCenter={(id) => {
              setCanvasObjects(prev => prev.map(obj => 
                obj.id === id ? { ...obj, x: 300, y: 350 } : obj
              ));
            }}
            onReset={() => {}}
            onSave={() => setSelectedId(null)}
          />
        ) : activeTool && (
          <ToolPanel 
            tool={activeTool} 
            onClose={() => setActiveTool(null)}
            onFileSelect={setUploadedFile}
            onRequestPlaceText={(text) => {
              // enable placing mode; KonvaCanvas will consume this request once
              setPlaceTextRequest({ id: `${Date.now()}`, text });
            }}
          />
        )}

        {/* Center Canvas Area */}
        <div className="flex-1 relative flex flex-col">
          {/* Undo/Redo Buttons */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <Button 
              variant="outline" 
              size="icon"
              className="bg-white shadow-sm"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="bg-white shadow-sm"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Canvas Container with Konva */}
          <div className="flex-1 overflow-hidden">
            <div 
              className="relative transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            >
              <KonvaCanvas
                activeTool={activeTool}
                productImage={productViews.find(v => v.id === activeView)?.image || ""}
                uploadedFile={uploadedFile}
                selectedId={selectedId}
                onSelectChange={setSelectedId}
                onObjectsChange={setCanvasObjects}
                placeTextRequest={placeTextRequest}
                onPlaceTextConsumed={() => setPlaceTextRequest(null)}
              />
            </div>
          </div>

          {/* Right Panel - Product Views */}
          <RightPanel
            views={productViews}
            activeView={activeView}
            onViewChange={setActiveView}
            zoom={zoom}
            onZoomIn={() => setZoom(prev => Math.min(prev + 0.25, 3))}
            onZoomOut={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
          />
        </div>
      </div>

      {/* Bottom Action Bar */}
      <BottomActionBar 
        productName="Gildan Midweight 50/50 Pullover Hoodie"
        productColor="Neon Blue"
      />
    </div>
  );
};

export default ProductEditor;
