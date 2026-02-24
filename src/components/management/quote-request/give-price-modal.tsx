import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import type { QuoteRequest } from "@/schemas/quote-request.schema";

const priceSchema = z.object({
  materialPrice: z.number().min(1, "Material price is required"),
  sizePrice: z.number().min(1, "Size price is required"),
});

type PriceFormValues = z.infer<typeof priceSchema>;

interface GivePriceModalProps {
  quote: QuoteRequest;
  trigger?: React.ReactNode;
}

export function GivePriceModal({ quote, trigger }: GivePriceModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      materialPrice: 0,
      sizePrice: 0,
    },
  });

  const onSubmit = (data: PriceFormValues) => {
    console.log("Sending price for quote:", quote.id, data);
    setOpen(false);
    form.reset();
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Give Price"
      actionTrigger={
        trigger || (
          <Button
            variant="destructive"
            className="w-full"
          >
            Quote Price <Send />
          </Button>
        )
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="materialPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter material price...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter size price...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="destructive" className="w-full">
              Send Price
            </Button>
          </div>
        </form>
      </Form>
    </ModalWrapper>
  );
}
