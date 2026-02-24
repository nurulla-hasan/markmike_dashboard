/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  dealSchema,
  type DealFormValues,
} from "@/schemas/deal.schema";
import { DealMediaSection } from "@/components/management/standout-deals/add-deal/deal-media-section";
import { DealInfoSection } from "@/components/management/standout-deals/add-deal/deal-info-section";
import { DealOptionsSection } from "@/components/management/standout-deals/add-deal/deal-options-section";
import { DealDescriptionSection } from "@/components/management/standout-deals/add-deal/deal-description-section";
import { DealProductsSection } from "@/components/management/standout-deals/add-deal/deal-products-section";
import PageLayout from "@/components/common/page-layout";
import type { Deal } from "@/types/deal.type";

export function EditDeal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dealData = location.state as Deal | undefined;

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

  useEffect(() => {
    if (dealData) {
      // In a real app, we would map the dealData to the form structure
      // For now, we'll just set some basic fields if they match
      form.reset({
        name: dealData.name,
        price: dealData.price,
        description: "", // dealData doesn't have description in the type yet
        productionMethods: ["printing"], // Mock data
        types: ["male"], // Mock data
        minQuantity: 10,
        deliveryOptions: ["standard"], // Mock data
        dealProducts: [],
      });
    } else {
      // Fetch deal by ID if not in state (mock implementation)
      console.log("Fetching deal with ID:", id);
    }
  }, [dealData, form, id]);

  function onSubmit(data: DealFormValues) {
    console.log("Updating deal:", data);
    // Update logic here
    navigate(-1); // Go back after success
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Edit Deal</h1>
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
              <Button type="submit">
                Update Deal
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

// Default export for lazy loading
export default EditDeal;
