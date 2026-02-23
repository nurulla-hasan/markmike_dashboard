import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  image: z.any().optional(), // Adjust based on how image upload is handled (string URL or File object)
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
