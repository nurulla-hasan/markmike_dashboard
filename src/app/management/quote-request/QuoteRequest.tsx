import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const QuoteRequest = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Quote Request"
          description="Manage your quote requests here."
        />
        <div>Quote Request Page Content</div>
      </div>
    </PageLayout>
  );
};

export default QuoteRequest;
