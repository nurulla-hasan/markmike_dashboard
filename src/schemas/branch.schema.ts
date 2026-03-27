import { z } from "zod";

export const branchPrinterSchema = z.object({
  name: z.string().min(1, "Printer name is required"),
  ipAddress: z.string().min(1, "IP address is required"),
});

export const branchKioskSchema = z.object({
  name: z.string().min(1, "Kiosk name is required"),
  ipAddress: z.string().min(1, "IP address is required"),
});

export const branchSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  code: z.string().min(1, "Branch code is required"),
  description: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Physical address is required"),
  mapLink: z.string().optional(),
  embeddedCode: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  image: z.any().optional(),
  printers: z.array(branchPrinterSchema).default([]),
  kiosks: z.array(branchKioskSchema).default([]),
});

export type TBranchFormValues = z.infer<typeof branchSchema>;

export const branchStaffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.string().min(1, "User type is required"),
});

export type TBranchStaffFormValues = z.infer<typeof branchStaffSchema>;
