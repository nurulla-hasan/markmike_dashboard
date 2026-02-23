import { useState } from "react";
import { Trash2 } from "lucide-react";

import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { Button } from "@/components/ui/button";
import type { Category } from "./columns";
import { CategoryModal } from "./category-modal";

interface CategoryActionProps {
  category: Category;
}

export const CategoryAction = ({ category }: CategoryActionProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    // Mock delete logic
    console.log("Deleting category", category.id);
    setIsDeleteOpen(false);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <CategoryModal initialData={category} mode="edit" />

      <Button
        variant="ghost"
        size="icon-sm"
        className="text-destructive"
        onClick={() => setIsDeleteOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>

      <ConfirmationModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        trigger={null}
        title="Delete Category?"
        description={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmButtonText="Delete"
        confirmLoadingText="Deleting..."
      />
    </div>
  );
};
