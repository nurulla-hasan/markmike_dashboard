import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/custom/search-input";

export const DealsFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      <div className="flex w-full items-center gap-3 md:w-auto">
        <SearchInput
          placeholder="Search..."
          // value={search}
          // onChange={(e) => setSearch?.(e.target.value)}
        />

        <Link to="/standout-deals/add">
          <Button>
            <Plus />
            Add New Deals
          </Button>
        </Link>
      </div>
    </div>
  );
};
