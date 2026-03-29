import { X, Upload, Type, Image, Box, Scissors, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import type { ToolType } from "./ProductEditor";

interface ToolPanelProps {
  tool: ToolType;
  onClose: () => void;
  onFileSelect?: (file: File) => void;
  onRequestPlaceText?: (text?: string) => void;
}

export function ToolPanel({ tool, onClose, onFileSelect, onRequestPlaceText }: ToolPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderUploadPanel = () => (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-white"
        onClick={handleBrowseClick}
      >
        <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium text-gray-700">Browse Your Computer</p>
        <p className="text-xs text-muted-foreground mt-1">or Drag & Drop Anywhere</p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Image className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">
              Vector or high resolution artwork of 300 DPI or more will look the best. Max size of 20 MB.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <p className="text-sm font-medium mb-2">Need help with your upload?</p>
        <p className="text-xs text-muted-foreground">
          <a href="#" className="text-blue-600 hover:underline">Chat now</a> or email{" "}
          <a href="#" className="text-blue-600 hover:underline">service@customink.com</a>
        </p>
      </div>
    </div>
  );

  const renderTextPanel = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Add Text</h3>
      <Button className="w-full" variant="outline" onClick={() => onRequestPlaceText?.()}>
        <Plus className="h-4 w-4 mr-2" />
        Add Text Element
      </Button>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Click on canvas to place text</p>
      </div>
      <div className="border-t pt-4 space-y-2">
        <p className="text-xs font-medium">Quick Add:</p>
        {["Event Name", "Team Name", "Date", "Location"].map((text) => (
          <button
            key={text}
            className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
            onClick={() => onRequestPlaceText?.(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );

  const renderArtPanel = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Add Art</h3>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          placeholder="Search artwork..." 
          className="w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["Heart", "Star", "Shield", "Trophy", "Flame", "Crown"].map((art) => (
          <button
            key={art}
            className="aspect-square border rounded-lg p-2 hover:border-primary transition-colors flex items-center justify-center bg-white"
          >
            <span className="text-2xl">🎨</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDetailsPanel = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Product Details</h3>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Size</p>
          <div className="flex flex-wrap gap-1">
            {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
              <button
                key={size}
                className="w-8 h-8 text-xs border rounded hover:border-primary transition-colors bg-white"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Color</p>
          <div className="flex flex-wrap gap-1">
            {[
              { name: "Black", hex: "#000000" },
              { name: "White", hex: "#FFFFFF" },
              { name: "Navy", hex: "#1e3a5f" },
              { name: "Red", hex: "#dc2626" },
              { name: "Blue", hex: "#2563eb" },
            ].map((color) => (
              <button
                key={color.name}
                className="w-6 h-6 rounded-full border shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNamesPanel = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Add Names/Numbers</h3>
      <Button className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Name List
      </Button>
      <div className="border rounded-lg p-4 bg-white">
        <p className="text-xs text-muted-foreground mb-2">Enter names (one per line):</p>
        <textarea
          className="w-full h-32 p-2 text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="John Doe&#10;Jane Smith&#10;..."
        />
      </div>
    </div>
  );

  const panels = {
    upload: renderUploadPanel,
    text: renderTextPanel,
    art: renderArtPanel,
    details: renderDetailsPanel,
    names: renderNamesPanel,
  };

  const renderPanel = panels[tool as keyof typeof panels] || (() => null);

  return (
    <div className="w-72 border-r bg-white flex flex-col h-full shrink-0 z-10 shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-sm capitalize flex items-center gap-2">
          {tool === "upload" && <Upload className="h-4 w-4" />}
          {tool === "text" && <Type className="h-4 w-4" />}
          {tool === "art" && <Image className="h-4 w-4" />}
          {tool === "details" && <Box className="h-4 w-4" />}
          {tool === "names" && <Scissors className="h-4 w-4" />}
          {tool}
        </h2>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {renderPanel()}
      </div>
    </div>
  );
}

export default ToolPanel;
