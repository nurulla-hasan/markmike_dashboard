/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Image as ImageIcon } from "lucide-react";

interface BrandModalProps {
  mode?: "add" | "edit";
  initialData?: any;
}

export function BrandModal({ mode = "add", initialData }: BrandModalProps) {
  const [open, setOpen] = useState(false);

  const defaultTrigger =
    mode === "add" ? (
      <Button>
        <Plus /> Add Brands
      </Button>
    ) : (
      <Button variant="ghost" size="icon-sm">
        <Edit />
        <span className="sr-only">Edit Brand</span>
      </Button>
    );

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "add" ? "Add New Brands" : "Edit Brands"}
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

        <div className="space-y-2">
          <Label htmlFor="image">Size Image</Label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="image"
              placeholder="Type here..."
              className="pl-9"
              defaultValue={initialData?.image}
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button className="w-full sm:w-auto">
            Add Brands
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
