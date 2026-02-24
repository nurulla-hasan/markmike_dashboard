/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DealFormValues, DealFormInput } from "@/schemas/deal.schema";

interface DealOptionsSectionProps {
  form: UseFormReturn<DealFormInput, any, DealFormValues>;
}

const PRODUCTION_METHODS = [
  { id: "printing", label: "Printing" },
  { id: "embroidery", label: "Embroidery" },
];

const TYPES = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
];

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard" },
  { id: "express", label: "Express" },
  { id: "rush", label: "Rush" },
];

export function DealOptionsSection({ form }: DealOptionsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Production Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Production Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormField
            control={form.control}
            name="productionMethods"
            render={() => (
              <FormItem>
                {PRODUCTION_METHODS.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="productionMethods"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormField
            control={form.control}
            name="types"
            render={() => (
              <FormItem>
                {TYPES.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="types"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Minimum Quantity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Minimum Quantity</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="minQuantity"
            render={({ field }) => (
              <FormItem className="flex gap-2 space-y-0">
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value as string | number}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <Button >
                  Add
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Delivery Option */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Delivery option</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormField
            control={form.control}
            name="deliveryOptions"
            render={() => (
              <FormItem>
                {DELIVERY_OPTIONS.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="deliveryOptions"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
