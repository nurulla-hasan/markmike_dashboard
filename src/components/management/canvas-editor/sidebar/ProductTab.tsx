import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";

interface ProductTabProps {
  canvasSize: { width: number; height: number };
  onSizeChange: (dim: 'width' | 'height', val: string) => void;
}

export const ProductTab: React.FC<ProductTabProps> = ({
  canvasSize,
  onSizeChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Canvas Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width (in)</Label>
          <Input
            id="width"
            type="number"
            step="0.1"
            value={canvasSize.width}
            onChange={(e) => onSizeChange('width', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (in)</Label>
          <Input
            id="height"
            type="number"
            step="0.1"
            value={canvasSize.height}
            onChange={(e) => onSizeChange('height', e.target.value)}
          />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
          <Download className="h-4 w-4 mr-2" /> Save to JSON
        </Button>
      </div>
    </div>
  );
};
