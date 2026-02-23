/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProductFormValues, ProductFormInput } from "@/schemas/product.schema";

interface ProductVariantsSectionProps {
  form: UseFormReturn<ProductFormInput, any, ProductFormValues>;
}

const COLORS = [
  { label: "Grey", value: "grey", hex: "#808080" },
  { label: "Orange", value: "orange", hex: "#FFA500" },
  { label: "Black", value: "black", hex: "#000000" },
  { label: "White", value: "white", hex: "#FFFFFF" },
  { label: "Red", value: "red", hex: "#FF0000" },
  { label: "Blue", value: "blue", hex: "#0000FF" },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

export function ProductVariantsSection({ form }: ProductVariantsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const handleAddVariant = () => {
    if (selectedColor && selectedSize && quantity) {
      append({
        color: selectedColor,
        size: selectedSize,
        quantity: parseInt(quantity),
      });
      // Reset fields
      setSelectedColor("");
      setSelectedSize("");
      setQuantity("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Add Color-Size-Quantity Combination
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select color and size from master lists, then specify quantity
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <FormLabel>Colors</FormLabel>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-sm border"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <FormLabel>Size</FormLabel>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent>
                {SIZES.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <FormLabel>Quantity</FormLabel>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Type here"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                type="button"
                onClick={handleAddVariant}
                className="bg-red-600 hover:bg-red-700 shrink-0"
                disabled={!selectedColor || !selectedSize || !quantity}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Product variants</h3>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12.5">#</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No variants added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  fields.map((field, index) => {
                    const colorObj = COLORS.find((c) => c.value === field.color);
                    return (
                      <TableRow key={field.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-sm border"
                              style={{ backgroundColor: colorObj?.hex || "#ccc" }}
                            />
                            {colorObj?.label || field.color}
                          </div>
                        </TableCell>
                        <TableCell>{field.size}</TableCell>
                        <TableCell>{field.quantity}</TableCell>
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
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
