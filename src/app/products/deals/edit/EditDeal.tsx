import { DealForm } from "@/components/products/deals/deal-form";
import { useParams } from "react-router-dom";
import type { IDeal } from "@/types/deal.type";

const EditDeal = () => {
    const { id } = useParams();
    
    // In a real app, fetch deal data by ID
    const initialData: IDeal = {
        id: id || "1",
        name: "Dry fit Deal",
        price: 70.00,
        description: "Most Popular Starter Deal...",
        thumbnail: "",
        images: [],
        rating: 4.5,
        reviewsCount: 1500,
        includeDigitizing: true,
        stitchAllowance: 10,
        showInStandoutCampaign: true,
        deliveryTimeframe: "5-7 days",
        products: []
    };

    return <DealForm mode="edit" initialData={initialData} />;
};

export default EditDeal;
