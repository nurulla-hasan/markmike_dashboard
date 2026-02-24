import type { ColumnDef } from "@tanstack/react-table";
import type { QuoteRequest } from "@/schemas/quote-request.schema";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { Badge } from "@/components/ui/badge";
import { ViewQuoteModal } from "./view-quote-modal";

export const columns: ColumnDef<QuoteRequest>[] = [
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("customerName")}</span>
        <span className="text-xs text-muted-foreground">{row.original.customerEmail}</span>
      </div>
    ),
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => <div>{row.getValue("productName")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "completed"
              ? "default"
              : status === "reviewed"
              ? "secondary"
              : "outline"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <ViewQuoteModal quote={item} />

          <ConfirmationModal
            title="Delete Request?"
            description={`Are you sure you want to delete the request from ${item.customerName}?`}
            onConfirm={() => console.log("Deleting quote:", item.id)}
            confirmButtonText="Delete"
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                title="Delete Request"
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
