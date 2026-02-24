import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import type { Miwahdiss } from "@/types/miwahdiss.type";

interface MiwahdissCardProps {
  item: Miwahdiss;
}

export function MiwahdissCard({ item }: MiwahdissCardProps) {
  const handleEdit = (id: string) => {
    // Implement edit logic
    console.log("Edit event:", id);
  };

  const handleDelete = (id: string) => {
    // Implement delete logic
    console.log("Delete event:", id);
  };

  return (
    <Card className="pt-0">
      <div className="relative aspect-12/8 overflow-hidden rounded-xl bg-muted mb-3">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base line-clamp-1">{item.title}</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-primary"
              onClick={() => handleEdit(item.id)}
            >
              <Edit />
            </Button>
            <ConfirmationModal
              title="Delete Event?"
              description="Are you sure you want to delete this event? This action cannot be undone."
              onConfirm={() => handleDelete(item.id)}
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
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
}
