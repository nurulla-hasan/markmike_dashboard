import type { ColumnDef } from "@tanstack/react-table";
import type { Admin } from "@/schemas/admin.schema";
import { Ban, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div>Email</div>,
    cell: ({ row }) => (
      <div>
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "designation",
    header: () => <div>Designation</div>,
    cell: ({ row }) => (
      <div>
        {row.getValue("designation")}
      </div>
    ),
  },
  {
    accessorKey: "branch",
    header: () => <div>Branch</div>,
    cell: ({ row }) => (
      <div>
        {row.getValue("branch")}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center justify-end">
          <ConfirmationModal
            title="Block Admin?"
            description={`Are you sure you want to block ${item.name}? This admin will lose access to the platform.`}
            onConfirm={() => console.log("Blocking admin:", item.id)}
            confirmButtonText="Block"
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                title="Block Admin"
              >
                <Ban />
              </Button>
            }
          />

          <ConfirmationModal
            title="Delete Admin?"
            description={`Are you sure you want to delete ${item.name}? This action cannot be undone.`}
            onConfirm={() => console.log("Deleting admin:", item.id)}
            confirmButtonText="Delete"
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                title="Delete Admin"
              >
                <Trash2 />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
