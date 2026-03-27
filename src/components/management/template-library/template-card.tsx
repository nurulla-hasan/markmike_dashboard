import { Edit, Trash2, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import type { ITemplate } from "@/types/template.type";

interface TemplateCardProps {
  item: ITemplate;
}

export function TemplateCard({ item }: TemplateCardProps) {
  return (
    <Card className="pt-0">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted border">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent>
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-bold text-base line-clamp-1">{item.title}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <Ruler className="h-3 w-3" />
              <span>{item.size}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Link to={`/template-library/edit/${item.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <ConfirmationModal
              title="Delete Template?"
              description="Are you sure you want to delete this template? This action cannot be undone."
              onConfirm={() => console.log("Delete template:", item.id)}
              trigger={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="font-normal text-[10px] px-2 py-0 h-5 bg-muted/50 text-muted-foreground border-none"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full mt-4"
          size="sm"
        >
          Assign Now
        </Button>
      </CardContent>
    </Card>
  );
}
