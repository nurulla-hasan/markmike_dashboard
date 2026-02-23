import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const MakeAdmin = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Make Admin"
          description="Create and manage admin accounts here."
        />
        <div>Make Admin Page Content</div>
      </div>
    </PageLayout>
  );
};

export default MakeAdmin;
