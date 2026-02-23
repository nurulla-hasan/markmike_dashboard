import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const ProductAttributes = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Product Attributes"
          description="Manage your product attributes here."
        />
        <div>Product Attributes Page Content</div>
      </div>
    </PageLayout>
  );
};

export default ProductAttributes;
