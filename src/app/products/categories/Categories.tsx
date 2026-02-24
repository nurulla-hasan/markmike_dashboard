import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import {
  categoryColumns,
  type Category,
} from "@/components/categories/columns";
import { CategoryModal } from "@/components/categories/category-modal";

// Dummy data
const CategoriesData: Category[] = [
  {
    id: "1",
    name: "T-Shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    itemCount: 120,
  },
  {
    id: "2",
    name: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9vZGllc3xlbnwwfHwwfHx8MA%3D%3D",
    itemCount: 85,
  },
  {
    id: "3",
    name: "Jeans",
    image:
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHx8MHx8fDA%3D",
    itemCount: 230,
  },
  {
    id: "4",
    name: "Jackets",
    image:
      "https://images.unsplash.com/photo-1551028919-383718bccf3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0c3xlbnwwfHwwfHx8MA%3D%3D",
    itemCount: 45,
  },
];

const Categories = () => {
  return (
    <PageLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="All Category"
          description="Manage your product categories here."
          length={CategoriesData.length}
        />
        <CategoryModal />
      </div>

      <DataTable
        columns={categoryColumns}
        data={CategoriesData}
        pageSize={10}
      />
    </PageLayout>
  );
};

export default Categories;
