import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const AllProducts = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="All Products"
          description="View and manage all your products here."
        />
        <div>All Products Page Content</div>
      </div>
    </PageLayout>
  );
};

export default AllProducts;
