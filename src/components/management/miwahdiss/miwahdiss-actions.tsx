import { Button } from "@/components/ui/button";
import { PencilLine, LayoutGrid, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { IMiwahdissEvent } from "@/types/miwahdiss.type";

export const MiwahdissActions = ({ event }: { event: IMiwahdissEvent }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => navigate(`/miwahdiss/edit/${event.id}`)}
        title="Edit Event"
      >
        <PencilLine />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        title="Catalog"
      >
        <LayoutGrid />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => navigate(`/miwahdiss/view/${event.id}`)}
        title="View Details"
      >
        <Eye />
      </Button>
    </div>
  );
};
