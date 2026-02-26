import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageGraphic {
  id: string;
  url: string;
  label: string;
}

interface UploadsTabProps {
  uploadedImages: ImageGraphic[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddGraphic: (url: string) => void;
}

export const UploadsTab: React.FC<UploadsTabProps> = ({ 
  uploadedImages, 
  onUpload, 
  onAddGraphic 
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Button 
          className="w-full" 
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <Upload className="h-5 w-5" /> Upload from this device
        </Button>
        <input 
          type="file" 
          id="image-upload" 
          className="hidden" 
          accept="image/*" 
          onChange={onUpload} 
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary">Recently uploaded</h3>
        <div className="grid grid-cols-3 gap-3">
          {uploadedImages.map((img) => (
            <div 
              key={img.id} 
              onClick={() => onAddGraphic(img.url)}
              className="aspect-square bg-muted/30 rounded-2xl border border-dashed border-border/40 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-all overflow-hidden group shadow-sm"
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
          {uploadedImages.length < 6 && Array.from({ length: 6 - uploadedImages.length }).map((_, i) => (
            <div 
              key={`empty-${i}`} 
              className="aspect-square bg-muted/20 rounded-2xl border border-dashed border-border/30 flex items-center justify-center"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
