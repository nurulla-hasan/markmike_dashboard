/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  dealSchema,
  type TDealFormValues,
} from "@/schemas/deal.schema";
import { DealMediaSection } from "@/components/management/standout-deals/add-deal/deal-media-section";
import { DealInfoSection } from "@/components/management/standout-deals/add-deal/deal-info-section";
import { DealOptionsSection } from "@/components/management/standout-deals/add-deal/deal-options-section";
import { DealDescriptionSection } from "@/components/management/standout-deals/add-deal/deal-description-section";
import { DealProductsSection } from "@/components/management/standout-deals/add-deal/deal-products-section";
import PageLayout from "@/components/common/page-layout";
import type { IDeal } from "@/types/deal.type";

export function EditDeal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dealData = location.state as IDeal | undefined;

  const form = useForm<TDealFormValues>({
    resolver: zodResolver(dealSchema as any),
    mode: "onChange",
    defaultValues: {
      name: "",
      price: "",
      description: "",
      includeDigitizing: false,
      showInStandoutCampaign: false,
      deliveryTimeframe: "",
      productionMethods: [],
      types: [],
      minQuantity: 1,
      deliveryOptions: [],
      products: [],
    },
  });

  useEffect(() => {
    if (dealData) {
      form.reset({
        name: dealData.name,
        price: dealData.price.toString(),
        description: dealData.description || "",
        includeDigitizing: dealData.includeDigitizing,
        showInStandoutCampaign: dealData.showInStandoutCampaign,
        deliveryTimeframe: dealData.deliveryTimeframe,
        productionMethods: [], // Data missing in IDeal
        types: [], // Data missing in IDeal
        minQuantity: 1, // Data missing in IDeal
        deliveryOptions: [], // Data missing in IDeal
        products: dealData.products?.map(p => ({
          productId: p.id,
          quantity: p.quantity
        })) || [],
      });
    } else {
      console.log("Fetching deal with ID:", id);
    }
  }, [dealData, form, id]);

  function onSubmit(data: TDealFormValues) {
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
