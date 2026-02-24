import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type DealsFilterState = {
  search?: string;
};

type DealsActionProps = {
  filter: DealsFilterState;
  setFilter: React.Dispatch<React.SetStateAction<DealsFilterState>>;
};

export const DealsFilter = ({ filter, setFilter }: DealsActionProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      <div className="flex w-full items-center gap-3 md:w-auto">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 pr-3 rounded-full bg-background md:w-64"
            value={filter.search || ""}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        <Button className="rounded-full">
          <Plus />
          Add New Deals
        </Button>
      </div>
    </div>
  );
};
