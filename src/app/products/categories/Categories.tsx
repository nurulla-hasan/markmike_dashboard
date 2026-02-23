import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const Categories = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Categories"
          description="Manage your product categories here."
        />
        <div>Categories Page Content</div>
      </div>
    </PageLayout>
  );
};

export default Categories;
