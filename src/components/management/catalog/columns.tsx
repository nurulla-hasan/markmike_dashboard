import type { ColumnDef } from "@tanstack/react-table";
import type { ICatalog } from "@/types/catalog.type";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CatalogActions } from "./catalog-actions";

export const columns: ColumnDef<ICatalog>[] = [
  {
    accessorKey: "name",
    header: "Catalog Name",
    cell: ({ row }) => (
      <div className="font-medium text-foreground">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Catalog Type",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.original.assignedTo;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={assignedTo.avatar} />
            <AvatarFallback>{assignedTo.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{assignedTo.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "Active" ? "success" : "muted"}
          className="font-normal"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => <CatalogActions catalog={row.original} />,
  },
];
