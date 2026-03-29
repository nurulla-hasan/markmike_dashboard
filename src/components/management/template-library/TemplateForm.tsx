import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
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
import { ProductEditor } from "@/components/management/product-editor";

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

        {/* Product Design Editor */}
        <ProductEditor />

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
