import { Edit, Trash2, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Deal } from "@/types/deal.type";
import { Link } from "react-router-dom";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="pt-0 border-none shadow-none">
      <div className="relative aspect-12/8 overflow-hidden rounded-xl bg-muted mb-3">
        <img
          src={deal.image}
          alt={deal.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          STAND OUT!
        </div>
      </div>

      <CardContent className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base line-clamp-1">
            {deal.name}
          </h3>
          <div className="flex items-center gap-1">
            <Link to={`/standout-deals/edit/${deal.id}`} state={deal}>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-primary"
              >
                <Edit />
              </Button>
            </Link>
            <ConfirmationModal
              title="Delete Deal?"
              description="Are you sure you want to delete this deal? This action cannot be undone."
              onConfirm={() => console.log("Delete deal", deal.id)}
              trigger={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 />
                </Button>
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-muted-foreground text-muted-foreground" />
          <span className="font-medium text-foreground">{deal.rating}</span>
          <span>({(deal.reviews / 1000).toFixed(1)}k+)</span>
        </div>

        <div className="text-lg font-bold text-red-500">
          {deal.price.toFixed(2)} {deal.currency}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-secondary text-secondary-foreground">
            <Zap className="h-4 w-4 fill-current" />
          </div>
          <span>{deal.deliveryTime}</span>
        </div>
      </CardContent>
    </Card>
  );
}
