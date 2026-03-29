import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductView } from "./ProductEditor";

interface RightPanelProps {
  views: ProductView[];
  activeView: string;
  onViewChange: (view: string) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function RightPanel({
  views,
  activeView,
  onViewChange,
  zoom,
  onZoomIn,
  onZoomOut,
}: RightPanelProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-4 z-10">
      {/* View Thumbnails */}
      <div className="flex flex-col gap-2">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`group relative h-14 w-14 rounded-lg border-2 overflow-hidden transition-all ${
              activeView === view.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-white hover:border-gray-300"
            }`}
          >
            <img
              src={view.image}
              alt={view.label}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] py-0.5 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {view.label}
            </span>
            {activeView === view.id && (
              <div className="absolute inset-0 bg-primary/10" />
            )}
          </button>
        ))}
      </div>

      {/* Zoom Controls */}
      <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-lg shadow-sm border">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onZoomIn}>
          <ZoomIn className="h-4 w-4 text-muted-foreground" />
        </Button>
        <span className="text-[10px] font-medium text-muted-foreground">
          {Math.round(zoom * 100)}%
        </span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onZoomOut}>
          <ZoomOut className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}

export default RightPanel;
