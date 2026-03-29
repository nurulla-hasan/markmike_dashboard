import { Upload, Type, Image, Box, Scissors } from "lucide-react";
import type { ToolType } from "./ProductEditor";

interface LeftToolbarProps {
  activeTool: ToolType;
  onToolClick: (tool: ToolType) => void;
}

const tools = [
  { id: "upload" as ToolType, icon: Upload, label: "Upload" },
  { id: "text" as ToolType, icon: Type, label: "Add Text" },
  { id: "art" as ToolType, icon: Image, label: "Add Art" },
  { id: "details" as ToolType, icon: Box, label: "Product Details" },
  { id: "names" as ToolType, icon: Scissors, label: "Add Names" },
];

export function LeftToolbar({ activeTool, onToolClick }: LeftToolbarProps) {
  return (
    <div className="w-16 border-r bg-white flex flex-col items-center py-4 gap-2 shrink-0 z-10">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolClick(tool.id)}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-14 ${
            activeTool === tool.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <tool.icon className="h-5 w-5" />
          <span className="text-[10px] leading-tight text-center">{tool.label}</span>
        </button>
      ))}
    </div>
  );
}

export default LeftToolbar;
