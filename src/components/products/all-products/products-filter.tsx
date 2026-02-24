import { Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { SearchInput } from "@/components/ui/custom/search-input";

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
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <Select
        value={filter.category || "all"}
        onValueChange={(value) =>
          setFilter((prev) => ({
            ...prev,
            category: value,
          }))
        }
      >
        <SelectTrigger className="w-full sm:w-28">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="t-shirt">T-Shirt</SelectItem>
          <SelectItem value="flyer">Flyer</SelectItem>
        </SelectContent>
      </Select>

      <SearchInput
        placeholder="Search..."
        className="sm:w-full"
        value={filter.search || ""}
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, search: e.target.value }))
        }
      />

      <Link to="/products/add" className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto">
          <Plus />
          Add New Product
        </Button>
      </Link>
    </div>
  );
};
