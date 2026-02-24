
import { SearchInput } from "@/components/ui/custom/search-input";

export const UsersFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Center search + filter icon */}
      <SearchInput
        placeholder="Search..."
        // value={search}
        // onChange={(e) => setSearch?.(e.target.value)}
      />
    </div>
  );
};
