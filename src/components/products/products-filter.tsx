import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ProductsFilterState = {
  category?: string | "all";
  search?: string;
};

type ProductsFilterProps = {
  filter: ProductsFilterState;
  setFilter: React.Dispatch<React.SetStateAction<ProductsFilterState>>;
};

export const ProductsFilter = ({ filter, setFilter }: ProductsFilterProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      <div className="flex w-full items-center gap-3 md:w-auto">
        <Select
          value={filter.category || "all"}
          onValueChange={(value) =>
            setFilter((prev) => ({
              ...prev,
              category: value,
            }))
          }
        >
          <SelectTrigger className="w-28 rounded-full bg-background">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="t-shirt">T-Shirt</SelectItem>
            <SelectItem value="flyer">Flyer</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 pr-3 rounded-full bg-background md:w-62.5"
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
