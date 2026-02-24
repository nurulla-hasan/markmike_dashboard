/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { dealSchema, type DealFormValues } from "@/schemas/deal.schema";
import { DealMediaSection } from "@/components/management/standout-deals/add-deal/deal-media-section";
import { DealInfoSection } from "@/components/management/standout-deals/add-deal/deal-info-section";
import { DealOptionsSection } from "@/components/management/standout-deals/add-deal/deal-options-section";
import { DealDescriptionSection } from "@/components/management/standout-deals/add-deal/deal-description-section";
import { DealProductsSection } from "@/components/management/standout-deals/add-deal/deal-products-section";
import PageLayout from "@/components/common/page-layout";

export function AddDeal() {
  const navigate = useNavigate();

  const form = useForm<
    z.input<typeof dealSchema>,
    any,
    z.output<typeof dealSchema>
  >({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      productionMethods: [],
      types: [],
      minQuantity: 10,
      deliveryOptions: [],
      dealProducts: [],
    },
  });

  function onSubmit(data: DealFormValues) {
    console.log(data);
    // Submit logic here
    // navigate(-1); // Go back after success
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Add New Deals</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column: Media */}
              <div className="space-y-6">
                <DealMediaSection form={form} />
              </div>

              {/* Middle Column: Basic Info */}
              <div className="space-y-6">
                <DealInfoSection form={form} />
                <DealDescriptionSection form={form} />
              </div>

              {/* Right Column: Options */}
              <div className="space-y-6">
                <DealOptionsSection form={form} />
              </div>
            </div>

            {/* Products Section */}
            <div className="grid grid-cols-1">
              <DealProductsSection form={form} />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-32"
              >
                Cancel
              </Button>
              <Button type="submit">Add Deals</Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default AddDeal;
