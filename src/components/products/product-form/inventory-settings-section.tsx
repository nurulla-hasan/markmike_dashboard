/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface InventorySettingsSectionProps {
  form: UseFormReturn<any>;
}

export function InventorySettingsSection({ form }: InventorySettingsSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg px-6 bg-white shadow-sm">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-6 hover:no-underline group">
        <div className="text-left">
          <h3 className="text-lg font-bold text-foreground tracking-tight">Inventory Settings</h3>
          <p className="text-sm text-muted-foreground font-medium">Stock or made to order</p>
        </div>
        <ChevronDown className={cn("size-5 transition-transform duration-200", isOpen && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-8">
          <div className="space-y-6 pt-4">
            <h4 className="text-lg font-bold text-foreground">Inventory Mode</h4>
            <FormField
              control={form.control}
              name="inventoryMode"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 border rounded-xl p-6 transition-all hover:bg-muted/5 cursor-pointer has-[:checked]:border-destructive/20 has-[:checked]:bg-destructive/5 group">
                        <FormControl>
                          <RadioGroupItem value="stock" className="group-has-checked:text-destructive group-has-[:checked]:border-destructive" />
                        </FormControl>
                        <div className="space-y-1 flex-1 cursor-pointer">
                          <FormLabel className="font-bold text-base cursor-pointer">Stock</FormLabel>
                          <p className="text-sm text-muted-foreground font-medium leading-none">
                            Product is stored in warehouse. Fast delivery.
                          </p>
                        </div>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0 border rounded-xl p-6 transition-all hover:bg-muted/5 cursor-pointer has-[:checked]:border-destructive/20 has-[:checked]:bg-destructive/5 group">
                        <FormControl>
                          <RadioGroupItem value="made-to-order" className="group-has-[:checked]:text-destructive group-has-[:checked]:border-destructive" />
                        </FormControl>
                        <div className="space-y-1 flex-1 cursor-pointer">
                          <FormLabel className="font-bold text-base cursor-pointer">Made-to-order</FormLabel>
                          <p className="text-sm text-muted-foreground font-medium leading-none">
                            Produced after customer order.
                          </p>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
  );
}
