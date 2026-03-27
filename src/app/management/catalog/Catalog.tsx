import { Button } from "@/components/ui/button";
import PageLayout from "@/components/common/page-layout";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/management/catalog/columns";
import type { ICatalog } from "@/types/catalog.type";
import PageHeader from "@/components/ui/custom/page-header";
import { SearchInput } from "@/components/ui/custom/search-input";
import { Plus } from "lucide-react";

const Catalog = () => {
  const navigate = useNavigate();

  const mockCatalogs: ICatalog[] = [
    {
      id: "1",
      name: "4th of July Special",
      type: "Retail",
      assignedTo: {
        id: "u1",
        name: "Nm Sujon",
        avatar: "/logo.png"
      },
      status: "Active",
      editorPermissions: "Text Edit",
      defaultDesignTemplates: ["/logo.png", "/logo.png", "/logo.png", "/logo.png"],
      products: [],
      itemCount: 10,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "4th of July Special",
      type: "Corporate",
      assignedTo: {
        id: "u2",
        name: "Sandral",
        avatar: "/logo.png"
      },
      status: "Inactive",
      editorPermissions: "Full Edit",
      defaultDesignTemplates: ["/logo.png", "/logo.png", "/logo.png", "/logo.png"],
      products: [],
      itemCount: 5,
      createdAt: "2024-01-16"
    }
  ];

  return (
    <PageLayout>
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="Catalog" description="Manage your catalogs here" />
        <div className="flex items-center gap-4">
          <SearchInput placeholder="Search Catalog..." />
          <Button
            onClick={() => navigate("/catalog/add")}
          >
            <Plus /> Create Catalog
          </Button>
        </div>
      </div>

      {/* Catalog Table */}
      <DataTable
        columns={columns}
        data={mockCatalogs}
        pageSize={10}
      />
    </PageLayout>
  );
};

export default Catalog;
