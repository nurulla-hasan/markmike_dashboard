import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/components/ui/custom/search-input";

export const OrdersFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <Select>
          <SelectTrigger className="w-28">
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

        <SearchInput
          placeholder="Search..."
          className="sm:w-full"
          // value={search}
          // onChange={(e) => setSearch?.(e.target.value)}
        />
    </div>
  );
};
