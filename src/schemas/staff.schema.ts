import { z } from "zod";

export const staffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.string().min(1, "User type is required"),
});

export type TStaffFormValues = z.infer<typeof staffSchema>;
