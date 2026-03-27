import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { SearchInput } from "@/components/ui/custom/search-input";
import { ArtworkCategoryCard } from "@/components/management/artwork-library/artwork-category-card";
import type { IArtworkCategory } from "@/types/artwork.type";

const ArtworkLibrary = () => {

  const mockCategories: IArtworkCategory[] = [
    { id: "1", name: "Shapes", image: "" },
    { id: "2", name: "Shapes", image: "" },
    { id: "3", name: "Shapes", image: "" },
    { id: "4", name: "Shapes", image: "" },
    { id: "5", name: "Shapes", image: "" },
  ];

  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Artwork library"
          description="Manage artwork categories and sub-categories."
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchInput placeholder="Search..." />
          <Button
            variant="destructive"
            onClick={() => console.log("Add Category Modal")}
          >
            <Plus />
            Add Category
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockCategories.map((category, index) => (
          <ArtworkCategoryCard key={index} item={category} />
        ))}
      </div>
    </PageLayout>
  );
};

export default ArtworkLibrary;
