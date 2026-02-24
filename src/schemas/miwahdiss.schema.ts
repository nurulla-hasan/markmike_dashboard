import { z } from "zod";

export const miwahdissSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  designs: z.array(
    z.object({
      id: z.string(),
      image: z.string(),
    })
  ),
});

export type MiwahdissFormValues = z.infer<typeof miwahdissSchema>;
