import { useState, useCallback, useMemo } from "react";
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

const MAX_HISTORY = 30;
const CENTER = { x: 300, y: 350 };

export const ProductEditor = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [activeView, setActiveView] = useState<string>("front");
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Per-view object storage ────────────────────────────────────────────────
  const [viewObjectsMap, setViewObjectsMap] = useState<Record<string, CanvasObject[]>>({
    front: [],
    back: [],
    "L sleeve": [],
    "R sleeve": [],
  });

  // ── Per-view undo / redo stacks ───────────────────────────────────────────
  const [undoStack, setUndoStack] = useState<Record<string, CanvasObject[][]>>({
    front: [], back: [], "L sleeve": [], "R sleeve": [],
  });
  const [redoStack, setRedoStack] = useState<Record<string, CanvasObject[][]>>({
    front: [], back: [], "L sleeve": [], "R sleeve": [],
  });

  const productViews: ProductView[] = [
    { id: "front",   label: "Front",    image: "/front.png"   },
    { id: "back",    label: "Back",     image: "/back.png"    },
    { id: "L sleeve", label: "L Sleeve", image: "/L sleeve.png" },
    { id: "R sleeve", label: "R Sleeve", image: "/R sleeve.png" },
  ];

  const currentObjects = useMemo(() => viewObjectsMap[activeView] ?? [], [viewObjectsMap, activeView]);

  // ── Core: push to undo stack and update objects ───────────────────────────
  const setObjects = useCallback(
    (newObjs: CanvasObject[], skipHistory = false) => {
      if (!skipHistory) {
        setUndoStack(s => ({
          ...s,
          [activeView]: [...(s[activeView] ?? []).slice(-MAX_HISTORY), viewObjectsMap[activeView] ?? []],
        }));
        setRedoStack(s => ({ ...s, [activeView]: [] }));
      }
      setViewObjectsMap(m => ({ ...m, [activeView]: newObjs }));
    },
    [activeView, viewObjectsMap]
  );

  const undo = useCallback(() => {
    const stack = undoStack[activeView] ?? [];
    if (!stack.length) return;
    const prev = stack[stack.length - 1];
    setRedoStack(s => ({
      ...s,
      [activeView]: [...(s[activeView] ?? []), viewObjectsMap[activeView] ?? []],
    }));
    setUndoStack(s => ({ ...s, [activeView]: stack.slice(0, -1) }));
    setViewObjectsMap(m => ({ ...m, [activeView]: prev }));
    setSelectedId(null);
  }, [activeView, undoStack, viewObjectsMap]);

  const redo = useCallback(() => {
    const stack = redoStack[activeView] ?? [];
    if (!stack.length) return;
    const next = stack[stack.length - 1];
    setUndoStack(s => ({
      ...s,
      [activeView]: [...(s[activeView] ?? []), viewObjectsMap[activeView] ?? []],
    }));
    setRedoStack(s => ({ ...s, [activeView]: stack.slice(0, -1) }));
    setViewObjectsMap(m => ({ ...m, [activeView]: next }));
    setSelectedId(null);
  }, [activeView, redoStack, viewObjectsMap]);

  // ── View switching (persists objects per view) ────────────────────────────
  const handleViewChange = (viewId: string) => {
    if (viewId === activeView) return;
    setSelectedId(null);
    setActiveView(viewId);
  };

  // ── Add helpers ───────────────────────────────────────────────────────────
  const addText = useCallback(
    (initialText?: string) => {
      const obj: CanvasObject = {
        id: `text-${Date.now()}`,
        type: "text",
        x: CENTER.x,
        y: CENTER.y,
        text: initialText || "Add Your Text",
        fontSize: 32,
        fontFamily: "Arial",
        fontStyle: "normal",
        textAlign: "center",
        fill: "#000000",
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      };
      setObjects([...currentObjects, obj]);
      setSelectedId(obj.id);
      setActiveTool(null);
    },
    [currentObjects, setObjects]
  );

  const addShape = useCallback(
    (shapeType: CanvasObject["shapeType"]) => {
      const obj: CanvasObject = {
        id: `shape-${Date.now()}`,
        type: "shape",
        shapeType,
        x: CENTER.x,
        y: CENTER.y,
        fill: "#333333",
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      };
      setObjects([...currentObjects, obj]);
      setSelectedId(obj.id);
      setActiveTool(null);
    },
    [currentObjects, setObjects]
  );

  const addImageFile = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        const obj: CanvasObject = {
          id: `img-${Date.now()}`,
          type: "image",
          x: CENTER.x,
          y: CENTER.y,
          width: img.width,
          height: img.height,
          image: img,
          src: url,
          rotation: 0,
          scaleX: 0.3,
          scaleY: 0.3,
        };
        setObjects([...currentObjects, obj]);
        setSelectedId(obj.id);
        setActiveTool(null);
      };
    },
    [currentObjects, setObjects]
  );

  // ── Object update/delete/duplicate/reorder ────────────────────────────────
  const updateObject = (id: string, updates: Partial<CanvasObject>) => {
    setObjects(currentObjects.map(o => (o.id === id ? { ...o, ...updates } : o)));
  };

  const deleteObject = (id: string) => {
    setObjects(currentObjects.filter(o => o.id !== id));
    setSelectedId(null);
  };

  const duplicateObject = (id: string) => {
    const obj = currentObjects.find(o => o.id === id);
    if (!obj) return;
    const copy: CanvasObject = { ...obj, id: `${obj.type}-${Date.now()}`, x: obj.x + 20, y: obj.y + 20 };
    setObjects([...currentObjects, copy]);
    setSelectedId(copy.id);
  };

  const reorderObject = (id: string, dir: "up" | "down") => {
    const idx = currentObjects.findIndex(o => o.id === id);
    if (idx === -1) return;
    const arr = [...currentObjects];
    const [item] = arr.splice(idx, 1);
    arr.splice(dir === "up" ? arr.length : Math.max(0, idx - 1), 0, item);
    setObjects(arr);
  };

  const centerObject = (id: string) => {
    updateObject(id, { x: CENTER.x, y: CENTER.y });
  };

  // Objects change coming from KonvaCanvas (drag, transform, inline edit)
  const handleObjectsChange = useCallback(
    (newObjs: CanvasObject[]) => {
      setObjects(newObjs);
    },
    [setObjects]
  );

  const selectedObj = currentObjects.find(o => o.id === selectedId) ?? null;

  const canUndo = (undoStack[activeView]?.length ?? 0) > 0;
  const canRedo = (redoStack[activeView]?.length ?? 0) > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-xl border bg-white overflow-hidden shadow-sm">
      {/* Main editor area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left icon bar — always visible */}
        <LeftToolbar
          activeTool={activeTool}
          onToolClick={tool => {
            setActiveTool(prev => (prev === tool ? null : tool));
            setSelectedId(null); // deselect so panel panel shows ToolPanel
          }}
        />

        {/* Side panel — ToolPanel or EditObjectPanel */}
        {selectedObj ? (
          <EditObjectPanel
            object={selectedObj}
            objects={currentObjects}
            onClose={() => setSelectedId(null)}
            onUpdate={updateObject}
            onDelete={deleteObject}
            onDuplicate={duplicateObject}
            onReorder={reorderObject}
            onCenter={centerObject}
            onReset={() => {}}
            onSave={() => setSelectedId(null)}
          />
        ) : activeTool ? (
          <ToolPanel
            tool={activeTool}
            onClose={() => setActiveTool(null)}
            onFileSelect={addImageFile}
            onAddText={addText}
            onAddShape={addShape}
          />
        ) : null}

        {/* Canvas area */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          {/* Undo / Redo */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <Button
              variant="outline" size="icon"
              className="bg-white shadow-sm"
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline" size="icon"
              className="bg-white shadow-sm"
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Konva Canvas */}
          <div className="flex-1 overflow-hidden">
            <KonvaCanvas
              activeTool={activeTool}
              productImage={productViews.find(v => v.id === activeView)?.image ?? ""}
              objects={currentObjects}
              selectedId={selectedId}
              zoom={zoom}
              onSelectChange={id => {
                setSelectedId(id);
                if (id) setActiveTool(null);
              }}
              onObjectsChange={handleObjectsChange}
              onDropFile={addImageFile}
            />
          </div>

          {/* Right panel — view thumbnails & zoom */}
          <RightPanel
            views={productViews}
            activeView={activeView}
            onViewChange={handleViewChange}
            zoom={zoom}
            onZoomIn={() => setZoom(z => Math.min(z + 0.25, 3))}
            onZoomOut={() => setZoom(z => Math.max(z - 0.25, 0.25))}
          />
        </div>
      </div>

      <BottomActionBar productName="Gildan Midweight 50/50 Pullover Hoodie" productColor="Neon Blue" />
    </div>
  );
};

export default ProductEditor;
