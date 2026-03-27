import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import type { IArtworkCategory } from "@/types/artwork.type";

interface ArtworkCategoryCardProps {
  item: IArtworkCategory;
}

export function ArtworkCategoryCard({ item }: ArtworkCategoryCardProps) {
  return (
    <Card className="group">
      <CardContent className="space-y-4">
        {/* Icon/Image Area */}
        <div className="flex justify-center py-4 bg-muted/5 rounded-lg">
          <div className="h-12 w-12 flex items-center justify-center border-2 border-foreground/80 rounded-2xl rotate-45 group-hover:scale-110 transition-transform">
             <div className="-rotate-45">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
             </div>
          </div>
        </div>

        {/* Title and Navigation */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-muted-foreground">{item.name}</h3>
          <Link to={`/design-tools/artwork-library/category/${item.id}`}>
            <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <ConfirmationModal
            title="Delete Category?"
            description={`Are you sure you want to delete ${item.name}?`}
            onConfirm={() => console.log("Delete category", item.id)}
            trigger={
              <Button 
                variant="outline" 
                className="flex-1"
              >
                Delete
              </Button>
            }
          />
          <Button 
            className="flex-1"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
