import { z } from "zod";

export const quoteRequestSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  productName: z.string().min(2, "Product name is required"),
  productSize: z.string().min(1, "Size is required"),
  productMaterial: z.string().min(1, "Material is required"),
  quantity: z.string().min(1, "Quantity is required"),
  customerMessage: z.string().optional(),
  productImage: z.string().optional(),
  status: z.enum(["pending", "reviewed", "completed"]).default("pending"),
  date: z.string().optional(),
});

export type QuoteRequestFormValues = z.infer<typeof quoteRequestSchema>;

export interface QuoteRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  productSize: string;
  productMaterial: string;
  quantity: string;
  customerMessage: string;
  productImage: string;
  status: "pending" | "reviewed" | "completed";
  date: string;
}
