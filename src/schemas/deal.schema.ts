import { z } from "zod";

export const dealSchema = z.object({
  name: z.string().min(2, { message: "Deal name must be at least 2 characters." }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number." }),
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
  minQuantity: z.coerce.number().min(1, { message: "Minimum quantity must be at least 1." }),
  deliveryOptions: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one delivery option.",
  }),

  // Selected Products for the deal
  dealProducts: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      image: z.string().optional(),
      size: z.string(),
      quantity: z.coerce.number().min(1),
    })
  ).default([]),
});

export type DealFormValues = z.infer<typeof dealSchema>;
export type DealFormInput = z.input<typeof dealSchema>;
