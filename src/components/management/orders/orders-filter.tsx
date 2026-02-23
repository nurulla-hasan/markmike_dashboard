import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderStatus } from "@/types/order.type";

type OrdersFilterState = {
  status?: OrderStatus | "all";
  search?: string;
};

type OrdersFilterProps = {
  filter: OrdersFilterState;
  setFilter: React.Dispatch<React.SetStateAction<OrdersFilterState>>;
};

export const OrdersFilter = ({ filter, setFilter }: OrdersFilterProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      <div className="flex w-full items-center gap-3 md:w-auto">
        <Select
          value={filter.status || "all"}
          onValueChange={(value) =>
            setFilter((prev) => ({
              ...prev,
              status: value === "all" ? "all" : (value as OrderStatus),
            }))
          }
        >
          <SelectTrigger className="w-28 rounded-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Awaiting Approval">Awaiting Approval</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Production">Production</SelectItem>
            <SelectItem value="On The Way">On The Way</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 pr-3 rounded-full"
            value={filter.search || ""}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
};

