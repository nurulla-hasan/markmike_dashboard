import type { ColumnDef } from "@tanstack/react-table";
import type { QuoteRequest } from "@/schemas/quote-request.schema";
import { Ban, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";

export const columns: ColumnDef<QuoteRequest>[] = [
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
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div>
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "designation",
    header: () => <div className="text-center">Designation</div>,
    cell: ({ row }) => (
      <div>
        {row.getValue("designation")}
      </div>
    ),
  },
  {
    accessorKey: "branch",
    header: () => <div className="text-center">Branch</div>,
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
        <div className="flex items-center justify-end gap-2 py-2">
          <ConfirmationModal
            title="Block User?"
            description={`Are you sure you want to block ${item.name}? This user will lose access to the platform.`}
            onConfirm={() => console.log("Blocking user:", item.id)}
            confirmButtonText="Block"
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                title="Block User"
              >
                <Ban />
              </Button>
            }
          />

          <ConfirmationModal
            title="Delete User?"
            description={`Are you sure you want to delete ${item.name}? This action cannot be undone.`}
            onConfirm={() => console.log("Deleting user:", item.id)}
            confirmButtonText="Delete"
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                title="Delete User"
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
