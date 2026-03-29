import { Share, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomActionBarProps {
  productName: string;
  productColor: string;
}

export function BottomActionBar({ productName, productColor }: BottomActionBarProps) {
  return (
    <div className="h-16 border-t bg-white px-4 flex items-center justify-between shrink-0">
      {/* Left - Add Products */}
      <Button variant="outline" className="gap-2">
        <Plus className="h-4 w-4" />
        Add Products
      </Button>

      {/* Center - Product Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded border bg-gray-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&auto=format&fit=crop"
              alt="Product"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{productName}</p>
            <p className="text-xs text-muted-foreground">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1 align-middle" />
              {productColor} · Change Product
            </p>
          </div>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Share className="h-4 w-4" />
          Save | Share
        </Button>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          Get Price
        </Button>
      </div>
    </div>
  );
}

export default BottomActionBar;
