export type CampaignType = "General Discount" | "Controlled Access";
export type DiscountType = "Fixed" | "Percentage";
export type CodeType = "Single Use" | "Multiple Use";

export interface ICampaign {
    id: string;
    name: string;
    type: CampaignType;
    startDate: string;
    endDate: string;
    discountType: DiscountType;
    discountValue: string;
    restrictedBranch?: string;
    restrictedCategory?: string;
    restrictedProduct?: string;
    quantity: number;
    codeType: CodeType;
    redemptionCode: string;
    status: "Active" | "Inactive";
    usageStats?: {
        totalUsed: number;
        remaining: number;
        maxAllowed: number;
        userCount: number;
    };
    revenueStats?: {
        totalRevenue: string;
        currency: string;
        growth: string;
        ordersLinked: number;
    };
}
