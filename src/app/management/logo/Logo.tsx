import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";

const Logo = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Logo"
          description="Manage your logo settings here."
        />
        <div>Logo Page Content</div>
      </div>
    </PageLayout>
  );
};

export default Logo;
