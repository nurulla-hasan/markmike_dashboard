import { z } from "zod";

export const miwahdissSectionSchema = z.object({
    title: z.string().min(1, "Section title is required"),
    description: z.string().min(1, "Section description is required"),
    catalogItems: z.array(z.string()).optional(),
});

export const miwahdissSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    description: z.string().min(1, "Description is required"),
    heroImage: z.any().optional(),
    eventDate: z.string().min(1, "Event date is required"),
    cutoffDate: z.string().min(1, "Cut-off date is required"),
    deliveryTimeline: z.string().min(1, "Delivery timeline is required"),
    enableCheckout: z.boolean().default(true),
    pdfCatalog: z.any().optional(),
    sections: z.array(miwahdissSectionSchema).optional(),
});

export type TMiwahdissFormValues = z.infer<typeof miwahdissSchema>;
