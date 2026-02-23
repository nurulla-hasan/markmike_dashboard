import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const StaffManagements = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Staff Managements"
          description="Manage your staff here."
        />
        <div>Staff Managements Page Content</div>
      </div>
    </PageLayout>
  );
};

export default StaffManagements;
