import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PencilLine, Trash2, Star, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DealCardProps {
    id?: string;
    name?: string;
    price?: string;
    thumbnail?: string;
    rating?: number;
    reviewsCount?: string;
    deliveryTimeframe?: string;
}

const DealCard = ({
    id = "1",
    name = "Dry fit Deal",
    price = "70.00",
    thumbnail = "/logo.png", // Placeholder
    rating = 4.5,
    reviewsCount = "1.5k+",
    deliveryTimeframe = "5-7 Days Delivery"
}: DealCardProps) => {
    const navigate = useNavigate();

    return (
        <Card className="overflow-hidden">
            <CardContent className="space-y-3">
                {/* Image Section */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                    <img 
                        src={thumbnail} 
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info Section */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-foreground">{name}</h3>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={() => navigate(`/products/deals/edit/${id}`)}
                            >
                                <PencilLine className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-muted-foreground text-muted-foreground" />
                        <span className="font-semibold text-foreground">{rating}</span>
                        <span>({reviewsCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-destructive">J$ {price}</span>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/30 w-fit px-2 py-1 rounded-md">
                        <Truck className="h-3.5 w-3.5" />
                        {deliveryTimeframe}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DealCard;
