import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  accountType: z.string().min(1, "Account type is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(1, "Phone number is required"),
  billingAddress: z.string().optional(),
  taxSettings: z.boolean().default(false),
});

export type UserFormValues = z.infer<typeof userSchema>;
