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
  minQuantity: z.coerce.number().min(1, { message: "Minimum quantity must be at least 1." }).default(1),
  deliveryOptions: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one delivery option.",
  }),

  // Method Constraints
  defaultMoq: z.coerce.number().min(1, { message: "Default MOQ must be at least 1." }).default(1),
  leadTimeDays: z.coerce.number().min(0, { message: "Lead time must be 0 or more." }).default(0),
  setupFee: z.coerce.number().min(0, { message: "Setup fee must be 0 or more." }).default(0),
  maxColor: z.coerce.number().min(0, { message: "Max color must be 0 or more." }).default(0),
  printingPositions: z.array(
    z.object({
      name: z.string().min(1, "Position name is required"),
      size: z.string().min(1, "Size is required"),
      coordinates: z.string().min(1, "Coordinates are required"),
    })
  ).default([]),

  // Inventory Settings
  inventoryMode: z.enum(["stock", "made-to-order"], {
    error: "Please select an inventory mode.",
  }).default("stock"),

  // Design Editor Permission
  editorMode: z.string().min(1, "Please select an editor mode.").default("Full - Complete design lab"),

  // Delivery Lead Time
  baseProductionTime: z.coerce.number().min(0, { message: "Base production time must be 0 or more." }).default(3),
  additionalDesignApprovalTime: z.coerce.number().min(0, { message: "Additional design approval time must be 0 or more." }).default(2),

  // Variants
  variants: z.array(
    z.object({
      color: z.string(),
      size: z.string(),
      quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
    })
  ).default([]),

  // Price Tiers
  priceTiers: z.array(
    z.object({
      minQuantity: z.coerce.number().min(1, { message: "Min quantity must be at least 1." }),
      price: z.coerce.number().min(0, { message: "Price must be 0 or more." }),
    })
  ).default([]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;
