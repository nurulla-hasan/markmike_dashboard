"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CustomizationSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
}

const PRODUCTION_METHODS = [
  { id: "printing", label: "Printing" },
  { id: "embroidery", label: "Embroidery" },
  { id: "dtg", label: "DTG" },
];

const TYPES = [
  { id: "standard-retail", label: "Standard Retail" },
  { id: "semi-custom", label: "Semi Custom" },
  { id: "bulk-custom", label: "Bulk / Custom" },
];

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard" },
  { id: "express", label: "Express" },
  { id: "rush", label: "Rush" },
];

export function CustomizationSection({ form }: CustomizationSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg px-6 bg-white shadow-sm">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-6 hover:no-underline group">
        <div className="text-left">
          <h3 className="text-lg font-bold text-foreground">Customization Method</h3>
          <p className="text-sm text-muted-foreground font-medium">Production capabilities</p>
        </div>
        <ChevronDown className={cn("size-5 transition-transform duration-200", isOpen && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Production Method */}
            <Card className="shadow-none border-muted/20">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-base">Production Method</h4>
                <div className="space-y-3">
                  {PRODUCTION_METHODS.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="productionMethods"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                return checked
                                  ? field.onChange([...current, item.id])
                                  : field.onChange(current.filter((v: string) => v !== item.id));
                              }}
                              className="data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
                            />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Type */}
            <Card className="shadow-none border-muted/20">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-base">Type</h4>
                <div className="space-y-3">
                  {TYPES.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="types"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                return checked
                                  ? field.onChange([...current, item.id])
                                  : field.onChange(current.filter((v: string) => v !== item.id));
                              }}
                              className="data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
                            />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Minimum Quantity */}
            <Card className="shadow-none border-muted/20">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-base">Minimum Quantity</h4>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="minQuantity"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="bg-muted/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" className="bg-destructive hover:bg-destructive/90 px-6">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Option */}
            <Card className="shadow-none border-muted/20">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-base">Delivery option</h4>
                <div className="space-y-3">
                  {DELIVERY_OPTIONS.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="deliveryOptions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                return checked
                                  ? field.onChange([...current, item.id])
                                  : field.onChange(current.filter((v: string) => v !== item.id));
                              }}
                              className="data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
                            />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CollapsibleContent>
      </Collapsible>
  );
}
