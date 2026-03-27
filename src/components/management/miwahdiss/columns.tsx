import type { ColumnDef } from "@tanstack/react-table";
import type { IMiwahdissEvent } from "@/types/miwahdiss.type";
import { Badge } from "@/components/ui/badge";
import { MiwahdissActions } from "./miwahdiss-actions";

export const columns: ColumnDef<IMiwahdissEvent>[] = [
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
    header: () => "Event Date",
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium">
        {row.getValue("eventDate")}
      </div>
    ),
  },
  {
    accessorKey: "cutoffDate",
    header: () => "Cut-off Date",
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium">
        {row.getValue("cutoffDate")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div>
          <Badge
            variant={
              status === "Active" ? "success" : status === "Draft" ? "muted" : "warning"
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
    cell: ({ row }) => <MiwahdissActions event={row.original} />,
  },
];
