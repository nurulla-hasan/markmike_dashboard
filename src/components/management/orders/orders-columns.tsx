 

import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TOrder } from "@/types/order.type";
import { OrderAction } from "./order-action";
import { OrderStatusSelector } from "./order-status-selector";

export const ordersColumns: ColumnDef<TOrder>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        #{row.original.orderId}
      </span>
    ),
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original.product;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded-md">
            <AvatarImage src={product.image} alt={product.name} />
            <AvatarFallback className="rounded-md">
              {product.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {product.name}
            </span>
            <span className="text-xs text-muted-foreground">
              Price :{" "}
              <span className="font-semibold">
                ${product.basePrice.toFixed(2)}
              </span>
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.quantity}
      </span>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-destructive">
        ${row.original.totalPrice.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-emerald-500">
        {row.original.paymentStatus}
      </span>
    ),
  },
  {
    accessorKey: "deliveryMethod",
    header: "Delivery",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.deliveryMethod}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <OrderStatusSelector status={row.original.status} />,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <OrderAction order={row.original} />
      </div>
    ),
  },
];
