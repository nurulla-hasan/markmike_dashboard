import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TextTabProps {
  textInput: string;
  onTextInputChange: (val: string) => void;
  onAddText: () => void;
}

export const TextTab: React.FC<TextTabProps> = ({ 
  textInput, 
  onTextInputChange, 
  onAddText 
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Edit your text below, or click on the field you'd like to edit directly on your design.
        </p>
        <div className="space-y-2">
          <Input 
            placeholder="Enter your text here..." 
            value={textInput}
            onChange={(e) => onTextInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onAddText()}
          />
        </div>
        <Button className="w-full" onClick={onAddText}>
          New Text Field
        </Button>
      </div>
    </div>
  );
};
