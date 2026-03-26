"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DesignEditorSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
}

export function DesignEditorSection({ form }: DesignEditorSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg px-6 bg-white shadow-sm">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-6 hover:no-underline group">
        <div className="text-left">
          <h3 className="text-lg font-bold text-foreground tracking-tight">Design Editor Permission</h3>
          <p className="text-sm text-muted-foreground font-medium">Control customer editing capabilities</p>
        </div>
        <ChevronDown className={cn("size-5 transition-transform duration-200", isOpen && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-8">
          <div className="space-y-6 pt-4">
            <h4 className="font-bold text-base">Editor mode</h4>
            <FormField
              control={form.control}
              name="editorMode"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-muted/30 h-12 rounded-xl">
                        <SelectValue placeholder="Select editor mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl border-muted/20">
                      <SelectItem value="Full - Complete design lab">Full - Complete design lab</SelectItem>
                      <SelectItem value="Basic - Text and icons only">Basic - Text and icons only</SelectItem>
                      <SelectItem value="Restricted - Template only">Restricted - Template only</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
  );
}
