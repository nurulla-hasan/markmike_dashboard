import PageLayout from "@/components/common/page-layout";
import CampaignCard from "@/components/products/campaigns/campaign-card";
import { AddCampaignModal } from "@/components/products/campaigns/add-campaign-modal";
import PageHeader from "@/components/ui/custom/page-header";

const Campaigns = () => {
    return (
        <PageLayout>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <PageHeader
                    title="Campaigns"
                    description="View and manage your product campaigns and discounts."
                />

               <AddCampaignModal mode="add" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <CampaignCard 
                    name="Summer sale" 
                    startDate="12 Feb 2025" 
                    endDate="12 Feb 2025" 
                    type="General Discount" 
                />
                <CampaignCard 
                    name="Summer sale" 
                    startDate="12 Feb 2025" 
                    endDate="12 Feb 2025" 
                    type="Controlled Access" 
                />
                <CampaignCard 
                    name="Summer sale" 
                    startDate="12 Feb 2025" 
                    endDate="12 Feb 2025" 
                    type="General Discount" 
                />
            </div>
        </PageLayout>
    );
};

export default Campaigns;