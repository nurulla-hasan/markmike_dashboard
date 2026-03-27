import type { ColumnDef } from "@tanstack/react-table";
import type { IMiwahdissEvent } from "@/types/miwahdiss.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilLine, LayoutGrid, Eye } from "lucide-react";

export const createColumns = (
  navigate: (path: string) => void
): ColumnDef<IMiwahdissEvent>[] => [
  {
    accessorKey: "name",
    header: "Event Name",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-16 rounded-md bg-muted overflow-hidden shrink-0">
            <img 
              src={event.heroImage || "/logo.png"} 
              alt={event.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="font-medium truncate max-w-50">{event.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "eventDate",
    header: () => <div className="text-center">Event Date</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground font-medium">
        {row.getValue("eventDate")}
      </div>
    ),
  },
  {
    accessorKey: "cutoffDate",
    header: () => <div className="text-center">Cut-off Date</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground font-medium">
        {row.getValue("cutoffDate")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="text-center">
          <Badge 
            variant="secondary" 
            className={
              status === "Active" ? "bg-green-100 text-green-600 hover:bg-green-100 border-none" : 
              status === "Draft" ? "bg-muted text-muted-foreground hover:bg-muted border-none" : 
              "bg-orange-100 text-orange-600 hover:bg-orange-100 border-none"
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const event = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground" 
            onClick={() => navigate(`/miwahdiss/edit/${event.id}`)}
            title="Edit Event"
          >
            <PencilLine className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Catalog"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground" 
            onClick={() => navigate(`/miwahdiss/view/${event.id}`)}
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
