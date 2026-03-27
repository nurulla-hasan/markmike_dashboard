import { Button } from "@/components/ui/button";
import { PencilLine, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ICatalog } from "@/types/catalog.type";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";

export const CatalogActions = ({ catalog }: { catalog: ICatalog }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => navigate(`/catalog/edit/${catalog.id}`)}
      >
        <PencilLine />
      </Button>
      <ConfirmationModal
        title="Delete Catalog?"
        description={`Are you sure you want to delete ${catalog.name}? This action cannot be undone.`}
        onConfirm={() => console.log("Deleting catalog:", catalog.id)}
        trigger={
          <Button
            variant="ghost"
            size="icon-sm"
            title="Delete Catalog"
          >
            <Trash2 />
          </Button>
        }
      />
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => navigate(`/catalog/view/${catalog.id}`)}
        title="View Details"
      >
        <Eye />
      </Button>
    </div>
  );
};
