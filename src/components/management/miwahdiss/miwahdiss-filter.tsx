import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/custom/search-input";

export function MiwahdissFilter() {
  return (
    <div className="flex items-center gap-4">
      <SearchInput placeholder="Search..." />

      <Link to="/miwahdiss/add">
        <Button>
          <Plus />
          Add New Events
        </Button>
      </Link>
    </div>
  );
}
