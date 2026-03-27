import { z } from "zod";

export const catalogProductSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  basePrice: z.string().min(1, "Base price is required"),
  pricingMode: z.enum(["Fixed", "Tier"]).default("Fixed"),
  moq: z.number().min(1, "MOQ must be at least 1"),
  quantityIncrementStep: z.number().min(1, "Increment step must be at least 1"),
});

export const catalogSchema = z.object({
  name: z.string().min(1, "Catalog name is required"),
  type: z.enum(["Retail", "Corporate"]).default("Retail"),
  assignedTo: z.string().min(1, "Assigned to is required"),
  isActive: z.boolean().default(true),
  editorPermissions: z.string().min(1, "Editor permissions are required"),
  defaultDesignTemplates: z.array(z.string()).optional(),
  products: z.array(catalogProductSchema).min(1, "At least one product must be added"),
});

export type TCatalogFormValues = z.infer<typeof catalogSchema>;
