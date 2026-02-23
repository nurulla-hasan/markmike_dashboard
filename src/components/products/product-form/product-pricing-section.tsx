/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProductFormValues, ProductFormInput } from "@/schemas/product.schema";

interface ProductPricingSectionProps {
  form: UseFormReturn<ProductFormInput, any, ProductFormValues>;
}

export function ProductPricingSection({ form }: ProductPricingSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "priceTiers",
  });

  const [minQuantity, setMinQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleAddTier = () => {
    if (minQuantity && price) {
      append({
        minQuantity: parseInt(minQuantity),
        price: parseFloat(price),
      });
      // Reset fields
      setMinQuantity("");
      setPrice("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Add Price Tier</CardTitle>
        <p className="text-sm text-muted-foreground">
          Define price tiers based on minimum quantity
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <FormLabel>Minimum Quantity</FormLabel>
            <Input
              type="number"
              placeholder="Enter quantity"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
            />
          </div>

          <div className="flex-1 space-y-2">
            <FormLabel>Price</FormLabel>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Button
                type="button"
                onClick={handleAddTier}
                disabled={!minQuantity || !price}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Price tier</h3>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12.5">#</TableHead>
                  <TableHead>Minimum quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No price tiers added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{field.minQuantity}</TableCell>
                      <TableCell>${field.price}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="h-8 w-8 text-destructive hover:text-destructive/90"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
