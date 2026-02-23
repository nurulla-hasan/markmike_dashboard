import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const Orders = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Orders"
          description="Manage your orders here."
        />
        <div>Orders Page Content</div>
      </div>
    </PageLayout>
  );
};

export default Orders;
