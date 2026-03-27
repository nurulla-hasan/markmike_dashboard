import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from "@/components/management/template-library/template-card";
import type { ITemplate } from "@/types/template.type";
import PageHeader from "@/components/ui/custom/page-header";
import { SearchInput } from "@/components/ui/custom/search-input";

const TemplateLibrary = () => {
  const navigate = useNavigate();

  const mockTemplates: ITemplate[] = Array(6).fill({
    id: "1",
    title: "T-shirt Design-1",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
    size: "24X30cm",
    tags: ["Birthday", "Event"],
    createdAt: "2024-03-27"
  }).map((t, i) => ({ ...t, id: String(i + 1) }));

  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <PageHeader
          title="Template Design"
          description="Manage and design your product templates."
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchInput placeholder="Search..." />
          <Button
            onClick={() => navigate("/template-library/add")}
          >
            <Plus />
            Create Template
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockTemplates.map((template) => (
          <TemplateCard key={template.id} item={template} />
        ))}
      </div>
    </PageLayout>
  );
};

export default TemplateLibrary;
