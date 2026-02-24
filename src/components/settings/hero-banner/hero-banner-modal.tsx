import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X } from "lucide-react";

const heroBannerSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.any().optional(),
});

type HeroBannerFormValues = z.infer<typeof heroBannerSchema>;

interface HeroBannerModalProps {
  mode?: "add" | "edit";
  initialData?: {
    title: string;
    description: string;
    image?: string;
  };
  trigger?: React.ReactNode;
}

export function HeroBannerModal({
  mode = "add",
  initialData,
  trigger,
}: HeroBannerModalProps) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    initialData?.image || null
  );

  const form = useForm<HeroBannerFormValues>({
    resolver: zodResolver(heroBannerSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: HeroBannerFormValues) => {
    console.log(
      mode === "add" ? "Adding hero banner:" : "Editing hero banner:",
      data
    );
    form.reset();
    setPreview(null);
    setOpen(false);
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "add" ? "Add New Banner" : "Edit Banner"}
      actionTrigger={
        trigger || (
          <Button>
            <Plus />
            Add Banner
          </Button>
        )
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-8 pt-4"
        >
          <div>
            <FormLabel className="mb-2">Banner Image</FormLabel>
            <div className="relative group">
              {preview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="destructive"
                    onClick={() => setPreview(null)}
                    className="absolute right-2 top-2 rounded-full transition-transform hover:scale-110"
                  >
                    <X />
                  </Button>
                </div>
              ) : (
                <label className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 transition-colors hover:bg-muted/10">
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="mb-2 text-sm font-semibold text-muted-foreground">
                      Click to upload image
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                      PNG, JPG or WebP (Max. 2MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter banner title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter banner description"
                    className="min-h-30 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="w-full max-w-50">
              {mode === "add" ? "Add Banner" : "Update Banner"}
            </Button>
          </div>
        </form>
      </Form>
    </ModalWrapper>
  );
}
