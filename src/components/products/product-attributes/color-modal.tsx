/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit } from "lucide-react";

interface ColorModalProps {
  mode?: "add" | "edit";
  initialData?: any;
}

export function ColorModal({ mode = "add", initialData }: ColorModalProps) {
  const [open, setOpen] = useState(false);

  const defaultTrigger =
    mode === "add" ? (
      <Button>
        <Plus /> Add Color
      </Button>
    ) : (
      <Button variant="ghost" size="icon-sm">
        <Edit />
        <span className="sr-only">Edit Color</span>
      </Button>
    );

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "add" ? "Create New Color" : "Edit Color"}
      actionTrigger={defaultTrigger}
    >
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Color Name</Label>
          <Input
            id="name"
            placeholder="Type here..."
            defaultValue={initialData?.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Color Code</Label>
          <Input
            id="code"
            placeholder="Type here..."
            defaultValue={initialData?.code}
          />
        </div>
        <div className="pt-4 flex justify-end">
          <Button className="w-full sm:w-auto">
            Add Color
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
