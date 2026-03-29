import { X, Copy, ArrowUpDown, Layers, FlipHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { CanvasObject } from "./KonvaCanvas";

interface EditObjectPanelProps {
  object: CanvasObject;
  objects?: CanvasObject[];
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<CanvasObject>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onReorder?: (id: string, direction: 'up' | 'down') => void;
  onCenter?: (id: string) => void;
  onReset: () => void;
  onSave: () => void;
}

export function EditObjectPanel({
  object,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  objects: _objects,
  onClose,
  onUpdate,
  onDelete,
  onDuplicate,
  onReorder,
  onCenter,
  onReset,
  onSave,
}: EditObjectPanelProps) {
  const isImage = object.type === "image";

  // Calculate size in inches (assuming 100px = 1 inch for mock)
  const widthInInches = ((object.width || 100) * (object.scaleX || 1) / 100).toFixed(2);
  const heightInInches = ((object.height || 100) * (object.scaleY || 1) / 100).toFixed(2);

  const handleRotationChange = (value: number[]) => {
    onUpdate(object.id, { rotation: value[0] });
  };

  const handleRotationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const deg = parseInt(e.target.value, 10) || 0;
    onUpdate(object.id, { rotation: deg });
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inches = parseFloat(e.target.value);
    if (!isNaN(inches) && inches > 0) {
      const newScaleX = (inches * 100) / (object.width || 100);
      onUpdate(object.id, { scaleX: newScaleX });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inches = parseFloat(e.target.value);
    if (!isNaN(inches) && inches > 0) {
      const newScaleY = (inches * 100) / (object.height || 100);
      onUpdate(object.id, { scaleY: newScaleY });
    }
  };

  return (
    <div className="w-80 border-r bg-white flex flex-col h-full shrink-0 z-10 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-base">
          Edit {isImage ? "Upload" : "Text"}
        </h2>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => onDelete(object.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Size Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Upload Size</label>
            <span className="text-xs text-gray-400">Width × Height</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="number"
                step="0.01"
                value={widthInInches}
                onChange={handleWidthChange}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">in</span>
            </div>
            <span className="text-gray-400">×</span>
            <div className="flex-1 relative">
              <input
                type="number"
                step="0.01"
                value={heightInInches}
                onChange={handleHeightChange}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">in</span>
            </div>
          </div>
        </div>

        {/* Edit Colors - For images and text */}
        <div className="space-y-3 border-t pt-4">
          <label className="text-sm font-medium text-gray-700">
            {isImage ? "Edit Colors" : "Text Color"}
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {["#000000", "#ffffff", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"].map((color) => (
              <button
                key={color}
                onClick={() => onUpdate(object.id, { fill: color })}
                className={`w-8 h-8 rounded border-2 transition-colors ${
                  object.fill === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-blue-500'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
            <input
              type="color"
              value={object.fill || "#000000"}
              onChange={(e) => onUpdate(object.id, { fill: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 border-t pt-4">
          <button 
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => onCenter?.(object.id)}
          >
            <div className="w-8 h-8 border rounded flex items-center justify-center">
              <ArrowUpDown className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Center</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => {
              // Show layering dropdown - for now just bring to front
              onReorder?.(object.id, 'up');
            }}
          >
            <div className="w-8 h-8 border rounded flex items-center justify-center">
              <Layers className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Layering</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => onUpdate(object.id, { scaleX: -(object.scaleX || 1) })}
          >
            <div className="w-8 h-8 border rounded flex items-center justify-center">
              <FlipHorizontal className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Flip</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => onDuplicate(object.id)}
          >
            <div className="w-8 h-8 border rounded flex items-center justify-center">
              <Copy className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Duplicate</span>
          </button>
        </div>

        {/* Rotation */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Rotation</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={Math.round(object.rotation || 0)}
                onChange={handleRotationInput}
                className="w-16 px-2 py-1 text-sm border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">°</span>
            </div>
          </div>
          <Slider
            value={[object.rotation || 0]}
            onValueChange={handleRotationChange}
            min={-180}
            max={180}
            step={1}
          />
        </div>

        {/* Reset & Save */}
        <div className="flex items-center justify-between border-t pt-4">
          <button 
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onReset}
          >
            Reset To Original
          </button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            onClick={onSave}
          >
            Save Design
          </Button>
        </div>

        {/* Pantone Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            i
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Need A Pantone Color Match?</p>
            <p className="text-sm text-blue-600 hover:underline cursor-pointer">
              Add your brand colors to orders of 6 items or more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditObjectPanel;
