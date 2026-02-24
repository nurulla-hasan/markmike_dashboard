import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  designation: z.string().min(2, "Designation is required"),
  branch: z.string().min(2, "Branch is required"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export type QuoteRequestFormValues = z.infer<typeof quoteRequestSchema>;

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  designation: string;
  branch: string;
  date?: string;
}
