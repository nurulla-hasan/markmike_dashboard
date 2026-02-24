import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/custom/search-input";

export function MiwahdissFilter() {
  return (
    <div className="flex items-center gap-4">

        <SearchInput
          placeholder="Search..."
          // value={search}
          // onChange={(e) => setSearch?.(e.target.value)}
        />

      <Button>
        <Plus />
        Add New Events
      </Button>
    </div>
  );
}
