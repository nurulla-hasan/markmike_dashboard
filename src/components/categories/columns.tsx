import type { ColumnDef } from "@tanstack/react-table";
import { CategoryAction } from "./category-action";

export type Category = {
  id: string;
  name: string;
  image: string;
  itemCount: number;
};

export const categoryColumns: ColumnDef<Category>[] = [
  {
    header: "SL",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return (
        <span className="text-sm font-medium text-foreground">
          {pageIndex * pageSize + row.index + 1}
        </span>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
        <img
          src={row.original.image}
          alt={row.original.name}
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "itemCount",
    header: "Items",
    cell: ({ row }) => <div>{row.original.itemCount} items</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <CategoryAction category={row.original} />,
  },
];
