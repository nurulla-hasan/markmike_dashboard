import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";

const QuoteRequest = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Make Admin"
          description="Create and manage admin accounts here."
        />
        <div>Quote Request Page Content</div>
      </div>
    </PageLayout>
  );
};

export default QuoteRequest;
