import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Trash2, ArrowRight } from "lucide-react";
import type { CampaignType } from "@/types/campaign.type";
import { useNavigate } from "react-router-dom";
import { AddCampaignModal } from "./add-campaign-modal";

interface CampaignCardProps {
    id?: string;
    name?: string;
    startDate?: string;
    endDate?: string;
    type?: CampaignType;
}

const CampaignCard = ({
    id = "1",
    name = "Summer sale",
    startDate = "12 Feb 2025",
    endDate = "12 Feb 2025",
    type = "General Discount"
}: CampaignCardProps) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/products/campaigns/view/${id}`);
    };

    return (
        <Card 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleView}
        >
            <CardContent className="space-y-4">
                {/* Header: Name and Actions */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">{name}</h3>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <AddCampaignModal mode="edit" />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Date Section */}
                <div className="bg-muted/50 rounded-xl p-4 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block font-medium">Starts</span>
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            {startDate}
                        </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted mx-2" />

                    <div className="space-y-1 text-right sm:text-left">
                        <span className="text-xs text-muted-foreground block font-medium">Ends</span>
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            {endDate}
                        </div>
                    </div>
                </div>

                {/* Badge Section */}
                <div className="flex">
                    <Badge
                        variant="destructive"
                        className="bg-destructive/10 hover:bg-destructive/20 text-destructive border-none px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                        {type}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default CampaignCard;
