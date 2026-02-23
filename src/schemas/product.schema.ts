import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  category: z.string({ error: "Please select a category." }).min(1, { message: "Please select a category." }),
  subCategory: z.string({ error: "Please select a sub-category." }).min(1, { message: "Please select a sub-category." }),
  material: z.string({ error: "Please select a material." }).min(1, { message: "Please select a material." }),
  brand: z.string({ error: "Please select a brand." }).min(1, { message: "Please select a brand." }),
  branch: z.string({ error: "Please select a branch." }).min(1, { message: "Please select a branch." }),
  description: z.string().optional(),
  
  // Media
  thumbnail: z.any().optional(), // In a real app, this would be File or string url
  gallery: z.array(z.any()).optional(),

  // Checkboxes
  productionMethods: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one production method.",
  }),
  types: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one type.",
  }),
  minQuantity: z.number().min(1, { message: "Minimum quantity must be at least 1." }),
  deliveryOptions: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one delivery option.",
  }),

  // Variants
  variants: z.array(
    z.object({
      color: z.string(),
      size: z.string(),
      quantity: z.number().min(1),
    })
  ).default([]),

  // Price Tiers
  priceTiers: z.array(
    z.object({
      minQuantity: z.number().min(1),
      price: z.number().min(0),
    })
  ).default([]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;
