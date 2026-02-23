/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit } from "lucide-react";

interface MaterialModalProps {
  mode?: "add" | "edit";
  initialData?: any;
}

export function MaterialModal({ mode = "add", initialData }: MaterialModalProps) {
  const [open, setOpen] = useState(false);

  const defaultTrigger =
    mode === "add" ? (
      <Button>
        <Plus /> Add Material
      </Button>
    ) : (
      <Button variant="ghost" size="icon-sm">
        <Edit />
        <span className="sr-only">Edit Material</span>
      </Button>
    );  

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "add" ? "Add New Material" : "Edit Material"}
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
          <Label>Select Category</Label>
          <Select defaultValue={initialData?.category}>
            <SelectTrigger>
              <SelectValue placeholder="T-shirt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="t-shirt">T-shirt</SelectItem>
              <SelectItem value="pants">Pants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Select Sub Category</Label>
          <Select defaultValue={initialData?.subCategory}>
            <SelectTrigger>
              <SelectValue placeholder="T-shirt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="t-shirt">T-shirt</SelectItem>
              <SelectItem value="pants">Pants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            placeholder="Type here..."
            defaultValue={initialData?.price}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button className="w-full sm:w-auto">
            Add Material
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
