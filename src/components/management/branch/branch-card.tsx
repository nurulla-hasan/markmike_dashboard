import { Edit, Eye, Trash2, MapPin, Phone, Mail, Printer, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import type { IBranch } from "@/types/branch.type";

interface BranchCardProps {
  item: IBranch;
}

export function BranchCard({ item }: BranchCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-foreground line-clamp-1">{item.name}</h3>
              <Badge variant="outline" className="bg-muted/30 text-[10px] font-medium h-5 px-1.5 uppercase">
                {item.code}
              </Badge>
            </div>
            <Badge 
              variant={item.status === "Active" ? "success" : "muted"} 
            >
              {item.status}
            </Badge>
          </div>
        </div>

        {/* Info List */}
        <div className="space-y-2.5">
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-sm leading-tight">{item.address}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            <span className="text-sm leading-tight">{item.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="text-sm leading-tight">{item.email}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Printer className="h-4 w-4 shrink-0" />
            <span className="text-sm leading-tight">{item.printersCount} Printers</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Monitor className="h-4 w-4 shrink-0" />
            <span className="text-sm leading-tight">{item.kiosksCount} Kiosk</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            asChild
            variant="outline"
            className="flex-1"
          >
            <Link to={`/branch/view/${item.id}`} state={item}>
              <Eye />
              View
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1"
          >
            <Link to={`/branch/edit/${item.id}`} state={item}>
              <Edit />
              Edit
            </Link>
          </Button>
          <ConfirmationModal
            title="Delete Branch?"
            description={`Are you sure you want to delete ${item.name}? This action cannot be undone.`}
            onConfirm={() => console.log("Delete branch:", item.id)}
            trigger={
              <Button
                variant="destructive"
                size="icon"
              >
                <Trash2 />
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
