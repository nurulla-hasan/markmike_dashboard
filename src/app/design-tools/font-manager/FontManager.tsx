import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";

const FontManager = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Font Manager"
        description="Manage and upload your custom fonts here."
      />
      <div className="mt-8 p-12 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground">
        Font Manager Placeholder (Coming Soon)
      </div>
    </PageLayout>
  );
};

export default FontManager;
