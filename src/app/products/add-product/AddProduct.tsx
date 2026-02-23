/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  productSchema,
  type ProductFormValues,
} from "@/schemas/product.schema";
import { ProductMediaSection } from "@/components/products/product-form/product-media-section";
import { ProductInfoSection } from "@/components/products/product-form/product-info-section";
import { ProductOptionsSection, ProductDeliverySection } from "@/components/products/product-form/product-options-section";
import { ProductDescription } from "@/components/products/product-form/product-description";
import { ProductVariantsSection } from "@/components/products/product-form/product-variants-section";
import { ProductPricingSection } from "@/components/products/product-form/product-pricing-section";
import PageLayout from "@/components/common/page-layout";

export function AddProduct() {
  const navigate = useNavigate();

  const form = useForm<
    z.input<typeof productSchema>,
    any,
    z.output<typeof productSchema>
  >({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      subCategory: "",
      material: "",
      brand: "",
      branch: "",
      description: "",
      productionMethods: [],
      types: [],
      deliveryOptions: [],
      minQuantity: 1,
      variants: [],
      priceTiers: [],
    },
  });

  function onSubmit(data: ProductFormValues) {
    console.log(data);
    // Submit logic here
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Add New Product</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column */}
              <div className="space-y-6">
                <ProductMediaSection form={form} />
                <ProductOptionsSection form={form} />
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                <ProductInfoSection form={form} />
                <ProductDeliverySection form={form} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <ProductDescription form={form} />
              </div>
            </div>

            {/* Bottom Section: Tables */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ProductVariantsSection form={form} />
              <ProductPricingSection form={form} />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Product</Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default AddProduct;
