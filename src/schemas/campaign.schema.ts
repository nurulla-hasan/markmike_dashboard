import { z } from "zod";

export const campaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required"),
    type: z.enum(["General Discount", "Controlled Access"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    discountType: z.enum(["Fixed", "Percentage"]),
    discountValue: z.string().min(1, "Discount value is required"),
    restrictedBranch: z.string().optional(),
    restrictedCategory: z.string().optional(),
    restrictedProduct: z.string().optional(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    codeType: z.enum(["Single Use", "Multiple Use"]),
    redemptionCode: z.string().min(1, "Redemption code is required"),
});

export type TCampaignFormValues = z.infer<typeof campaignSchema>;
