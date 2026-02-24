/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { MiwahdissFormValues } from "@/schemas/miwahdiss.schema";

interface MiwahdissDesignUploadSectionProps {
  form: UseFormReturn<MiwahdissFormValues, any>;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MiwahdissDesignUploadSection({
  form,
}: MiwahdissDesignUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddDesign = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const currentDesigns = form.getValues("designs") || [];

      if (currentDesigns.length >= 5) {
        alert("You can only add up to 5 designs.");
        return;
      }

      const newDesign = {
        id: Math.random().toString(36).substr(2, 9),
        image: URL.createObjectURL(file),
      };
      form.setValue("designs", [...currentDesigns, newDesign]);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
