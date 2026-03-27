import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";

const ArtworkLibrary = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Artwork Library"
        description="Manage your artwork and designs here."
      />
      <div className="mt-8 p-12 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground">
        Artwork Editor Placeholder (Coming Soon)
      </div>
    </PageLayout>
  );
};

export default ArtworkLibrary;
