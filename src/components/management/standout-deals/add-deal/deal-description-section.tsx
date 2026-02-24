/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { DealFormValues, DealFormInput } from "@/schemas/deal.schema";

interface DealDescriptionSectionProps {
  form: UseFormReturn<DealFormInput, any, DealFormValues>;
}

export function DealDescriptionSection({ form }: DealDescriptionSectionProps) {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Type here"
                className="min-h-30 md:min-h-110 resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
