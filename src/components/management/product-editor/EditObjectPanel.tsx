import { X, Copy, Layers, FlipHorizontal, Trash2, AlignLeft, AlignCenter, AlignRight, Italic, Bold } from "lucide-react";
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

const FONTS = ["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana", "Impact", "Comic Sans MS", "Trebuchet MS"];

export function EditObjectPanel({
  object,
  onClose,
  onUpdate,
  onDelete,
  onDuplicate,
  onReorder,
  onCenter,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onReset: _onReset,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSave: _onSave,
}: EditObjectPanelProps) {
  const isText = object.type === "text";
  const isImage = object.type === "image";
  const isShape = object.type === "shape";

  // Calculate size in inches (assuming 100px = 1 inch for mock)
  const baseW = object.width || (isText ? (object.fontSize || 24) * 4 : 100);
  const baseH = object.height || (isText ? (object.fontSize || 24) : 100);
  const widthInInches = (baseW * (object.scaleX || 1) / 100).toFixed(2);
  const heightInInches = (baseH * (object.scaleY || 1) / 100).toFixed(2);

  const handleRotationChange = (value: number[]) => {
    onUpdate(object.id, { rotation: value[0] });
  };

  const handleRotationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const deg = parseInt(e.target.value, 10) || 0;
    onUpdate(object.id, { rotation: deg });
  };

  return (
    <div className="w-80 border-r bg-white flex flex-col h-full shrink-0 z-20 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b shrink-0 bg-gray-50/50">
        <h2 className="font-semibold text-sm">
          Edit {isImage ? "Upload" : isText ? "Text" : "Shape"}
        </h2>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(object.id)}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* TEXT SPECIFIC CONTROLS */}
        {isText && (
          <>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Text Content</label>
              <textarea
                value={object.text || ""}
                onChange={(e) => onUpdate(object.id, { text: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-15 resize-y"
              />
              <p className="text-[10px] text-gray-400">Or double-click text on canvas to edit inline</p>
            </div>

            <div className="space-y-3 border-t pt-4">
              <label className="text-xs font-medium text-gray-700">Font & Style</label>
              
              <select
                value={object.fontFamily || "Arial"}
                onChange={(e) => onUpdate(object.id, { fontFamily: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {FONTS.map(font => <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>)}
              </select>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={`flex-1 h-8 ${object.fontStyle?.includes('bold') ? 'bg-gray-100 border-gray-400' : ''}`}
                  onClick={() => {
                    const current = object.fontStyle || "";
                    const isBold = current.includes('bold');
                    const newStyle = isBold ? current.replace('bold', '').trim() : `${current} bold`.trim();
                    onUpdate(object.id, { fontStyle: newStyle || "normal" });
                  }}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`flex-1 h-8 ${object.fontStyle?.includes('italic') ? 'bg-gray-100 border-gray-400' : ''}`}
                  onClick={() => {
                    const current = object.fontStyle || "";
                    const isItalic = current.includes('italic');
                    const newStyle = isItalic ? current.replace('italic', '').trim() : `${current} italic`.trim();
                    onUpdate(object.id, { fontStyle: newStyle || "normal" });
                  }}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="border-l mx-1" />
                <Button
                  variant="outline" size="icon" className={`flex-1 h-8 ${object.textAlign === 'left' ? 'bg-gray-100' : ''}`}
                  onClick={() => onUpdate(object.id, { textAlign: 'left' })}
                ><AlignLeft className="h-4 w-4" /></Button>
                <Button
                  variant="outline" size="icon" className={`flex-1 h-8 ${object.textAlign === 'center' ? 'bg-gray-100' : ''}`}
                  onClick={() => onUpdate(object.id, { textAlign: 'center' })}
                ><AlignCenter className="h-4 w-4" /></Button>
                <Button
                  variant="outline" size="icon" className={`flex-1 h-8 ${object.textAlign === 'right' ? 'bg-gray-100' : ''}`}
                  onClick={() => onUpdate(object.id, { textAlign: 'right' })}
                ><AlignRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </>
        )}

        {/* COLORS - For Text and Shapes */}
        {(isText || isShape) && (
          <div className="space-y-3 border-t pt-4">
            <label className="text-xs font-medium text-gray-700">Fill Color</label>
            <div className="flex items-center gap-2 flex-wrap">
              {["#000000", "#ffffff", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"].map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdate(object.id, { fill: color })}
                  className={`w-7 h-7 rounded border shadow-sm transition-transform hover:scale-110 ${
                    object.fill === color ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <input
                type="color"
                value={object.fill || "#000000"}
                onChange={(e) => onUpdate(object.id, { fill: e.target.value })}
                className="w-7 h-7 rounded cursor-pointer border-0 p-0"
                title="Custom Color"
              />
            </div>

            {/* Stroke Color */}
            <div className="pt-2">
              <label className="text-xs font-medium text-gray-700 flex items-center justify-between mb-2">
                <span>Outline Color</span>
                {(object.strokeWidth || 0) > 0 && (
                  <button 
                    onClick={() => onUpdate(object.id, { strokeWidth: 0, stroke: undefined })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </label>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {["#000000", "#ffffff", "#ef4444", "#3b82f6"].map((color) => (
                  <button
                    key={`stroke-${color}`}
                    onClick={() => onUpdate(object.id, { stroke: color, strokeWidth: object.strokeWidth || 2 })}
                    className={`w-5 h-5 rounded border shadow-sm ${
                      object.stroke === color ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {(object.strokeWidth || 0) > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500 w-8">Width</span>
                  <Slider
                    value={[object.strokeWidth || 2]}
                    onValueChange={(v) => onUpdate(object.id, { strokeWidth: v[0] })}
                    min={1} max={10} step={1}
                    className="flex-1"
                  />
                  <span className="text-[10px] text-gray-500 w-4">{object.strokeWidth}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DIMENSIONS */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-700">Dimensions</label>
            <span className="text-[10px] text-gray-400">Inches (Approx)</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded border">
            <div className="flex-1 text-center">
              <div className="text-sm font-medium">{widthInInches}″</div>
              <div className="text-[10px] text-gray-500">Width</div>
            </div>
            <div className="text-gray-300">×</div>
            <div className="flex-1 text-center">
              <div className="text-sm font-medium">{heightInInches}″</div>
              <div className="text-[10px] text-gray-500">Height</div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-4 gap-2 border-t pt-4">
          <button 
            className="flex flex-col items-center gap-1 p-2 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            onClick={() => onCenter?.(object.id)}
            title="Center on shirt"
          >
            <AlignCenter className="h-4 w-4" />
            <span className="text-[9px]">Center</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            onClick={() => onReorder?.(object.id, 'up')}
            title="Bring Forward"
          >
            <Layers className="h-4 w-4" />
            <span className="text-[9px]">Forward</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            onClick={() => onUpdate(object.id, { scaleX: -(object.scaleX || 1) })}
            title="Flip Horizontal"
          >
            <FlipHorizontal className="h-4 w-4" />
            <span className="text-[9px]">Flip</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            onClick={() => onDuplicate(object.id)}
            title="Duplicate Object"
          >
            <Copy className="h-4 w-4" />
            <span className="text-[9px]">Copy</span>
          </button>
        </div>

        {/* ROTATION */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-700">Rotation</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={Math.round(object.rotation || 0)}
                onChange={handleRotationInput}
                className="w-12 px-1 py-1 text-xs border rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-xs text-gray-500">°</span>
            </div>
          </div>
          <Slider
            value={[object.rotation || 0]}
            onValueChange={handleRotationChange}
            min={-180} max={180} step={1}
          />
        </div>

      </div>
    </div>
  );
}

export default EditObjectPanel;
