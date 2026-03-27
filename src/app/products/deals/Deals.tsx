import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DealCard from "@/components/products/deals/deal-card";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/ui/custom/search-input";

const Deals = () => {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <PageHeader
                    title="All Deals"
                    description="View and manage your product deals and bundles."
                />

                <div className="flex items-center gap-4">
                    <SearchInput placeholder="Search..." />
                    <Button
                        onClick={() => navigate("/products/deals/add")}
                    >
                        <Plus/>
                        Add New Deals
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <DealCard key={i} id={String(i)} />
                ))}
            </div>
        </PageLayout>
    );
};

export default Deals;
