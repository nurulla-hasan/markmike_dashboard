/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { MiwahdissFormValues } from "@/schemas/miwahdiss.schema";

interface MiwahdissDesignListSectionProps {
  form: UseFormReturn<MiwahdissFormValues, any>;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MiwahdissDesignListSection({
  form,
}: MiwahdissDesignListSectionProps) {
  const designs = form.watch("designs") || [];

  const handleRemove = (id: string) => {
    const currentDesigns = form.getValues("designs") || [];
    form.setValue(
      "designs",
      currentDesigns.filter((d) => d.id !== id)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Designs</CardTitle>
      </CardHeader>
      <CardContent>
        {designs.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/10 text-muted-foreground">
            No designs added yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {designs.map((design) => (
              <div
                key={design.id}
                className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
              >
                <img
                  src={design.image}
                  alt="Design"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleRemove(design.id)}
                    className="rounded-full bg-destructive p-2 text-destructive-foreground hover:bg-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
