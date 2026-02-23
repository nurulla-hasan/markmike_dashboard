import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const StandoutDeals = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Standout Deals"
          description="Manage your standout deals here."
        />
        <div>Standout Deals Page Content</div>
      </div>
    </PageLayout>
  );
};

export default StandoutDeals;
