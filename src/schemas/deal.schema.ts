import { z } from "zod";

export const dealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.any().optional(),
  images: z.array(z.any()).optional(),
  includeDigitizing: z.boolean().default(false),
  stitchAllowance: z.number().optional(),
  showInStandoutCampaign: z.boolean().default(false),
  deliveryTimeframe: z.string().min(1, "Delivery timeframe is required"),
  reelVideo: z.any().optional(),
  productionMethods: z.array(z.string()).default([]),
  types: z.array(z.string()).default([]),
  minQuantity: z.number().default(1),
  deliveryOptions: z.array(z.string()).default([]),
  products: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1)
  })).min(1, "At least one product must be added")
});

export type TDealFormValues = z.infer<typeof dealSchema>;
