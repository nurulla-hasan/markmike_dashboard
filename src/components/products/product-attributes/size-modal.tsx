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
import { Plus, Edit, Image as ImageIcon } from "lucide-react";

interface SizeModalProps {
  mode?: "add" | "edit";
  initialData?: any;
}

export function SizeModal({ mode = "add", initialData }: SizeModalProps) {
  const [open, setOpen] = useState(false);

  const defaultTrigger =
    mode === "add" ? (
      <Button>
        <Plus /> Add Size
      </Button>
    ) : (
      <Button variant="ghost" size="icon-sm">
        <Edit />
        <span className="sr-only">Edit Size</span>
      </Button>
    );

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "add" ? "Create New Size" : "Edit Size"}
      actionTrigger={defaultTrigger}
    >
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Input
            id="size"
            placeholder="Type here..."
            defaultValue={initialData?.size}
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
            Add Size
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
