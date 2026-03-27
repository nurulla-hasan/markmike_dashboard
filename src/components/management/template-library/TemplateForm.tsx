import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X, RotateCcw, RotateCw, Upload, Type, Image, Box, Scissors, ZoomIn } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { templateSchema, type TTemplateFormValues } from "@/schemas/template.schema";
import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";

export function TemplateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [tagInput, setTagInput] = useState("");

  const form = useForm<TTemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      title: "",
      tags: ["Birthday", "Event"],
      editorData: {},
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const tags = form.watch("tags") || [];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      form.setValue("tags", [...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue("tags", tags.filter(tag => tag !== tagToRemove));
  };

  function onSubmit(data: TTemplateFormValues) {
    console.log(isEdit ? "Updating template:" : "Creating template:", data);
    navigate("/template-library");
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title={isEdit ? "Edit Template" : "Template Design"}
          showBack
        />

        {/* Editor Placeholder Area */}
        <div className="relative rounded-xl border bg-muted/20 overflow-hidden shadow-sm">
          <div className="flex h-112.5">
            {/* Editor Sidebar Placeholder */}
            <div className="w-16 border-r bg-white flex flex-col items-center py-4 gap-6 shrink-0">
              <div className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground cursor-pointer">
                <Upload className="h-5 w-5" />
                <span>Upload</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground cursor-pointer">
                <Type className="h-5 w-5" />
                <span>Add Text</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground cursor-pointer">
                <Image className="h-5 w-5" />
                <span>Add Art</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground cursor-pointer">
                <Box className="h-5 w-5" />
                <span>Product Details</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground cursor-pointer">
                <Scissors className="h-5 w-5" />
                <span>Add Names</span>
              </div>
            </div>

            {/* Editor Main Canvas Placeholder */}
            <div className="flex-1 relative flex items-center justify-center p-8 bg-[#e5e7eb]">
              {/* Undo/Redo Buttons */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Button variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="outline" size="icon">
                  <RotateCw className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>

              {/* T-shirt Placeholder Image */}
              <div className="relative max-w-full h-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80"
                  alt="Product"
                  className="max-h-full w-auto object-contain mix-blend-multiply"
                />
              </div>

              {/* Right Sidebar Tools Placeholder */}
              <div className="absolute top-4 right-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded border bg-white shadow-sm overflow-hidden cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&auto=format&fit=crop" alt="View" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-1 bg-white p-2 rounded shadow-sm cursor-pointer">
                  <ZoomIn className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Zoom</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Controls */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Title */}
              <Card>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Template Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Type here...." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Tags Section */}
              <Card>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <FormLabel>Tags</FormLabel>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">References Tags</p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="10%"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={handleAddTag}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                          >
                            {tag}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-destructive"
                              onClick={() => handleRemoveTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
              >
                {isEdit ? "Save Changes" : "Save Template"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default TemplateForm;
