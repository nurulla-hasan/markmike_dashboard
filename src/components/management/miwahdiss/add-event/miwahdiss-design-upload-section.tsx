
import { useRef } from "react";
import { Button } from "@/components/ui/button";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MiwahdissDesignUploadSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddDesign = () => {
    // Logic to add design to sections
    console.log("Add design logic needs to be updated for sections");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Event Designs</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Select Design
          </label>
          <Input
            type="file"
            ref={fileInputRef}
            className="cursor-pointer"
            onChange={() => {
              // Optional: show preview before adding
            }}
          />
        </div>

        <Button type="button" onClick={handleAddDesign}>
          Add to List
        </Button>
      </CardContent>
    </Card>
  );
}
