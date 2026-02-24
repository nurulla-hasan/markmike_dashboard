/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera, Plus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { DealFormValues, DealFormInput } from "@/schemas/deal.schema";

interface DealMediaSectionProps {
  form: UseFormReturn<DealFormInput, any, DealFormValues>;
}

export function DealMediaSection({ form }: DealMediaSectionProps) {
  return (
    <div className="space-y-4">
      {/* Thumbnail Upload */}
      <FormField
        control={form.control}
        name="thumbnail"
        render={() => (
          <FormItem>
            <FormLabel className="sr-only">Thumbnail</FormLabel>
            <FormControl>
              <div className="flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 text-muted-foreground transition-colors hover:bg-muted cursor-pointer">
                <Camera className="h-10 w-10 mb-2 opacity-50" />
                <span className="text-sm">Upload Deals Thumbnail image</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Gallery Upload - Mock UI */}
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square flex items-center justify-center rounded-md bg-muted/50 border border-muted-foreground/20"
          >
            <Camera className="h-5 w-5 text-muted-foreground/50" />
          </div>
        ))}
        <div className="aspect-square flex items-center justify-center rounded-md bg-muted/50 border border-muted-foreground/20 hover:bg-muted cursor-pointer">
          <Plus className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
