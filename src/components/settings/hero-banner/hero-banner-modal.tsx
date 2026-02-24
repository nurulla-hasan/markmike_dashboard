import { useState, useEffect } from "react";
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
import { Plus, Upload, X, Search } from "lucide-react";

const heroBannerSchema = z.object({
  header: z.string().min(2, "Header is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  productId: z.string().min(1, "Product selection is required"),
  image: z.any().optional(),
});

type HeroBannerFormValues = z.infer<typeof heroBannerSchema>;

interface HeroBannerModalProps {
  mode?: "add" | "edit";
  initialData?: {
    header: string;
    description: string;
    productId: string;
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
      header: initialData?.header || "",
      description: initialData?.description || "",
      productId: initialData?.productId || "",
    },
  });

  useEffect(() => {
    if (open && initialData) {
      form.reset({
        header: initialData.header,
        description: initialData.description,
        productId: initialData.productId,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(initialData.image || null);
    } else if (open && mode === "add") {
      form.reset({
        header: "",
        description: "",
        productId: "",
      });
      setPreview(null);
    }
  }, [open, initialData, form, mode]);

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
          className="space-y-6 p-6"
        >
          <div>
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
                    className="absolute right-2 top-2"
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
                    <p className="text-sm font-medium text-muted-foreground">
                      Upload avatar image
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
            name="header"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Header</FormLabel>
                <FormControl>
                  <Input placeholder="Type here...." {...field} />
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
                <FormLabel>
                  Description
                </FormLabel>
                <FormControl>
                  <Input placeholder="Type here...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Select Product
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Search to select Product"
                      className="pr-10"
                      {...field}
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="destructive"
              className="w-full max-w-50 font-bold"
            >
              +Add New Banners
            </Button>
          </div>
        </form>
      </Form>
    </ModalWrapper>
  );
}
