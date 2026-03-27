export interface IDeal {
    id: string;
    name: string;
    price: number;
    description: string;
    thumbnail: string;
    images: string[];
    rating: number;
    reviewsCount: number;
    deliveryTimeframe: string;
    includeDigitizing: boolean;
    stitchAllowance?: number;
    showInStandoutCampaign: boolean;
    reelVideo?: string;
    products: {
        id: string;
        name: string;
        quantity: number;
        image: string;
    }[];
}
