import { Camera, Edit, Plus } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categorySchema,
  type CategoryFormValues,
} from "@/schemas/category.schema";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";

import { useState } from "react";

interface CategoryDialogProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  mode?: "add" | "edit";
}

export function CategoryModal({
  mode = "add",
}: CategoryDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const defaultTrigger =
    mode === "add" ? (
      <Button>
        <Plus /> Add Category
      </Button>
    ) : (
      <Button variant="ghost" size="icon-sm">
        <Edit />
        <span className="sr-only">Edit</span>
      </Button>
    );

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "edit" ? "Edit Category" : "Add Category"}
      description={
        mode === "edit"
          ? "Make changes to your category here."
          : "Add a new category to your store."
      }
      actionTrigger={defaultTrigger}
    >
      <Form {...form}>
        <form className="space-y-4 p-6">
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 text-muted-foreground transition-colors hover:bg-muted cursor-pointer">
                    <Camera className="h-8 w-8 mb-2 opacity-50" />
                    <span className="text-xs">Upload Image</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button">Save</Button>
          </div>
        </form>
      </Form>
    </ModalWrapper>
  );
}
