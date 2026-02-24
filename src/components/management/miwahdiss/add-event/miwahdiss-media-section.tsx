/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera, Plus } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { MiwahdissFormValues } from "@/schemas/miwahdiss.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MiwahdissMediaSectionProps {
  form: UseFormReturn<MiwahdissFormValues, any>;
}

export function MiwahdissMediaSection({ form }: MiwahdissMediaSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Media</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-4">
                  {/* Hidden File Input */}
                  <Input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const currentImages = field.value || [];
                      
                      if (currentImages.length + files.length > 5) {
                        alert("You can only upload up to 5 images.");
                        return;
                      }

                      const fileNames = files.map((f) => URL.createObjectURL(f));
                      field.onChange([...currentImages, ...fileNames]);
                    }}
                  />

                  {/* Main Upload Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 transition-colors hover:bg-muted/10"
                  >
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Camera className="h-8 w-8" />
                      <p className="text-sm font-medium">Upload Image or Video</p>
                    </div>
                  </div>

                  {/* Thumbnail List */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {field.value?.map((url: string, index: number) => (
                      <div
                        key={index}
                        className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-muted-foreground/10"
                      >
                        <img
                          src={url}
                          alt={`Upload ${index}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newImages = [...field.value];
                            newImages.splice(index, 1);
                            field.onChange(newImages);
                          }}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Plus className="h-4 w-4 rotate-45 text-white" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Placeholder boxes if empty */}
                    {(!field.value || field.value.length === 0) && [1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/10 bg-muted/30"
                      >
                        <Camera className="h-5 w-5 text-muted-foreground/30" />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/10 hover:bg-muted/20"
                    >
                      <Plus className="h-5 w-5 text-muted-foreground/50" />
                    </button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
