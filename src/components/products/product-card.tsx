import { Edit, ShoppingBag, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { TProduct } from "@/types/product.type";

export interface ProductCardProps {
  product: TProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="pt-0">
      <div className="relative aspect-12/8 overflow-hidden rounded-xl bg-muted mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:text-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:text-destructive"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({(product.reviews / 1000).toFixed(1)}k+)</span>
        </div>

        <div className="text-lg font-bold text-primary">
          {product.price.toFixed(2)} {product.currency}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-secondary text-secondary-foreground">
            <Zap className="h-3.5 w-3.5 fill-current" />
          </div>
          <span>{product.deliveryTime}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="h-6 w-6 rounded border border-border"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {(product.soldCount / 1000).toFixed(1)}k+
        </span>
      </CardFooter>
    </Card>
  );
}
