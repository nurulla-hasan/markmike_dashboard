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
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DeliveryLeadTimeSectionProps {
  form: UseFormReturn<any>;
}

export function DeliveryLeadTimeSection({ form }: DeliveryLeadTimeSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg px-6 bg-white shadow-sm">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-6 hover:no-underline group">
        <div className="text-left">
          <h3 className="text-lg font-bold text-foreground tracking-tight">Delivery Lead Time</h3>
          <p className="text-sm text-muted-foreground font-medium">Production and delivery timelines</p>
        </div>
        <ChevronDown className={cn("size-5 transition-transform duration-200", isOpen && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <FormField
              control={form.control}
              name="baseProductionTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Base Production Time (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="bg-muted/30 h-12 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalDesignApprovalTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Additional Design Approval Time (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="bg-muted/30 h-12 rounded-xl"
                    />
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
