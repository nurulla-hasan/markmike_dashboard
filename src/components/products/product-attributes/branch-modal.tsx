/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit } from "lucide-react";

interface BranchModalProps {
  mode?: "add" | "edit";
  initialData?: any;
}

export function BranchModal({ mode = "add", initialData }: BranchModalProps) {
  const [open, setOpen] = useState(false);

  const defaultTrigger =
    mode === "add" ? (
      <Button>
        <Plus /> Add Branch
      </Button>
    ) : (
      <Button variant="ghost" size="icon-sm">
        <Edit />
        <span className="sr-only">Edit Branch</span>
      </Button>
    );

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "add" ? "Add New Branch" : "Edit Branch"}
      actionTrigger={defaultTrigger}
    >
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Type here..."
            defaultValue={initialData?.name}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button className="w-full sm:w-auto">
            Add Branch
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
