import { z } from "zod";

export const templateSchema = z.object({
  title: z.string().min(1, "Template title is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  editorData: z.any().optional(),
});

export type TTemplateFormValues = z.infer<typeof templateSchema>;
