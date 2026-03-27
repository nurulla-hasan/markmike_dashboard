import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/ui/custom/page-header";
import { SearchInput } from "@/components/ui/custom/search-input";
import { DataTable } from "@/components/ui/custom/data-table";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import type { ColumnDef } from "@tanstack/react-table";
import type { IArtworkSubCategory } from "@/types/artwork.type";

const ArtworkSubCategories = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const mockSubCategories: IArtworkSubCategory[] = [
    { id: "1", name: "Tropical Bliss", categoryId: id || "1" },
    { id: "2", name: "Tropical Bliss", categoryId: id || "1" },
  ];

  const columns: ColumnDef<IArtworkSubCategory>[] = [
    {
      accessorKey: "name",
      header: "Sub-category Name",
      cell: ({ row }) => (
        <div className="font-medium text-foreground">{row.getValue("name")}</div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => console.log("Edit Sub-category", row.original.id)}
          >
            <Edit />
          </Button>
          <ConfirmationModal
            title="Delete Sub-category?"
            description={`Are you sure you want to delete ${row.original.name}?`}
            onConfirm={() => console.log("Delete sub-category", row.original.id)}
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
              >
                <Trash2 />
              </Button>
            }
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate(`/design-tools/artwork-library/assets/${row.original.id}`)}
          >
            <Eye />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title={mockSubCategories[0].name}
          showBack
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchInput placeholder="Search..." />
          <Button
            variant="destructive"
            onClick={() => console.log("Add Sub-category Modal")}
          >
            <Plus />
            Add Sub-Category
          </Button>
        </div>
      </div>

        <DataTable
          columns={columns}
          data={mockSubCategories}
          pageSize={10}
        />
    </PageLayout>
  );
};

export default ArtworkSubCategories;
