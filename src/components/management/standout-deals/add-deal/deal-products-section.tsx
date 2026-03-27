/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
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
import type { TDealFormValues } from "@/schemas/deal.schema";

interface DealProductsSectionProps {
  form: UseFormReturn<TDealFormValues, any>;
}

const PRODUCTS = [
  {
    id: "1",
    name: "Canvas t-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Hat",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Hoodie",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?w=100&auto=format&fit=crop&q=60",
  },
];

// const SIZES = ["S", "M", "L", "XL", "XXL"];

export function DealProductsSection({ form }: DealProductsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const handleAddProduct = () => {
    if (selectedProductId && quantity) {
      append({
        productId: selectedProductId,
        quantity: parseInt(quantity),
      });
      // Reset fields
      setSelectedProductId("");
      setQuantity("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Add Products</CardTitle>
        <p className="text-sm text-muted-foreground">
          Select Product for standout deals
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selection Inputs */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1 space-y-2">
            <FormLabel>Select products</FormLabel>
            <Select
              value={selectedProductId}
              onValueChange={setSelectedProductId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCTS.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div className="flex items-center gap-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-6 w-6 rounded object-cover"
                      />
                      {product.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              placeholder="Type here"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <Button
            type="button"
            className="w-full md:w-auto"
            onClick={handleAddProduct}
            disabled={!selectedProductId || !quantity}
          >
            Add
          </Button>
        </div>

        {/* Product Variants Table */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Product variants</h3>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12.5">#</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No products added.
                    </TableCell>
                  </TableRow>
                ) : (
                  fields.map((field, index) => {
                    const productInfo = PRODUCTS.find((p) => p.id === field.productId);
                    return (
                      <TableRow key={field.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {productInfo?.image && (
                              <img
                                src={productInfo.image}
                                alt={productInfo.name}
                                className="h-8 w-8 rounded object-cover"
                              />
                            )}
                            <span>{productInfo?.name || "Unknown Product"}</span>
                          </div>
                        </TableCell>
                        <TableCell>{field.quantity}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => remove(index)}
                            className="text-destructive"
                          >
                            <Trash2 />
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
