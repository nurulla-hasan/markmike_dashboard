import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GraphicsData } from './types';

interface GraphicsTabProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  filteredGraphics: GraphicsData;
  onAddShape: (type: string) => void;
  onAddGraphic: (url: string) => void;
}

export const GraphicsTab: React.FC<GraphicsTabProps> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  filteredGraphics,
  onAddShape,
  onAddGraphic,
}) => {
  return (
    <div className="space-y-6">
      {!activeCategory ? (
        <>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search graphics..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            {/* Shapes */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => onCategoryChange('Shapes')}
              >
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Shapes</h3>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {filteredGraphics.shapes.slice(0, 3).map((shape) => (
                  <div 
                    key={shape.id} 
                    onClick={() => onAddShape(shape.type)}
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
            </div>

            {/* Images */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => onCategoryChange('Images')}
              >
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Images</h3>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {filteredGraphics.images.slice(0, 3).map((img) => (
                  <div 
                    key={img.id} 
                    onClick={() => onAddGraphic(img.url)}
                    className="aspect-square bg-muted rounded-lg border border-border/50 hover:border-primary/30 transition-all cursor-pointer overflow-hidden group shadow-sm hover:shadow-md"
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Icons */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => onCategoryChange('Icons')}
              >
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Icons</h3>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {filteredGraphics.icons.slice(0, 3).map((icon) => (
                  <div 
                    key={icon.id} 
                    onClick={() => onAddGraphic(icon.url)}
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
            </div>

            {/* Illustrations */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => onCategoryChange('Illustrations')}
              >
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">Illustrations</h3>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {filteredGraphics.illustrations.slice(0, 3).map((ill) => (
                  <div 
                    key={ill.id} 
                    onClick={() => onAddGraphic(ill.url)}
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
                onClick={() => onCategoryChange(null)}
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
                onClick={() => onAddShape(shape.type)}
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
                onClick={() => onAddGraphic(img.url)}
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
                onClick={() => onAddGraphic(icon.url)}
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
                onClick={() => onAddGraphic(ill.url)}
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
  );
};
