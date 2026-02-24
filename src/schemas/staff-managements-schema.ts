import { z } from "zod";

export const staffManagementSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  designation: z.string().min(2, "Designation is required"),
  branch: z.string().min(2, "Branch is required"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export type StaffManagementFormValues = z.infer<typeof staffManagementSchema>;

export interface StaffManagement {
  id: string;
  name: string;
  email: string;
  designation: string;
  branch: string;
  date?: string;
}
