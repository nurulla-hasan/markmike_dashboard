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
import { ProductDescription } from "@/components/products/product-form/product-description";
import { ProductVariantsSection } from "@/components/products/product-form/product-variants-section";
import { ProductPricingSection } from "@/components/products/product-form/product-pricing-section";
import { CustomizationSection } from "@/components/products/product-form/customization-section";
import { MethodConstraintsSection } from "@/components/products/product-form/method-constraints-section";
import { InventorySettingsSection } from "@/components/products/product-form/inventory-settings-section";
import { DesignEditorSection } from "@/components/products/product-form/design-editor-section";
import { DeliveryLeadTimeSection } from "@/components/products/product-form/delivery-lead-time-section";
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
      defaultMoq: 1,
      leadTimeDays: 0,
      setupFee: 0,
      maxColor: 0,
      printingPositions: [],
      inventoryMode: "stock",
      editorMode: "Full - Complete design lab",
      baseProductionTime: 3,
      additionalDesignApprovalTime: 2,
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
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold uppercase tracking-widest">Add New Product</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column */}
              <div className="space-y-8">
                <ProductMediaSection form={form} />
              </div>

              {/* Middle Column */}
              <div className="space-y-8">
                <ProductInfoSection form={form} />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <ProductDescription form={form} />
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-6">
              <CustomizationSection form={form} />
              <MethodConstraintsSection form={form} />
              <InventorySettingsSection form={form} />
              <DesignEditorSection form={form} />
              <DeliveryLeadTimeSection form={form} />
            </div>

            {/* Bottom Section: Tables */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ProductVariantsSection form={form} />
              <ProductPricingSection form={form} />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-32"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-white w-40">
                Add Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default AddProduct;
