import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { miwahdissSchema, type MiwahdissFormValues } from "@/schemas/miwahdiss.schema";
import { MiwahdissMediaSection } from "@/components/management/miwahdiss/add-event/miwahdiss-media-section";
import { MiwahdissInfoSection } from "@/components/management/miwahdiss/add-event/miwahdiss-info-section";
import { MiwahdissDesignUploadSection } from "@/components/management/miwahdiss/add-event/miwahdiss-design-upload-section";
import { MiwahdissDesignListSection } from "@/components/management/miwahdiss/add-event/miwahdiss-design-list-section";
import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";

export function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm<MiwahdissFormValues>({
    resolver: zodResolver(miwahdissSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      designs: [],
    },
  });

  // Simulate fetching data for editing
  useEffect(() => {
    if (id) {
      // In a real app, you would fetch data here
      console.log("Fetching event with ID:", id);
      // Example of setting values after fetch
      /*
      form.reset({
        name: "Existing Event Name",
        description: "Existing Event Description",
        images: ["https://example.com/image1.jpg"],
        designs: [{ id: "1", image: "https://example.com/design1.jpg" }]
      });
      */
    }
  }, [id, form]);

  const onSubmit: SubmitHandler<MiwahdissFormValues> = (data) => {
    console.log("Updating event:", data);
    // Update logic here
    // navigate(-1);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl space-y-8 pb-12">
        <PageHeader
          showBack
          title="Edit Event"
          description="Update event details, images and product designs."
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Left Column: Media (40%) */}
              <div className="lg:col-span-5">
                <MiwahdissMediaSection form={form} />
              </div>

              {/* Right Column: Basic Info & Designs (60%) */}
              <div className="space-y-8 lg:col-span-7">
                <MiwahdissInfoSection form={form} />
                <MiwahdissDesignUploadSection form={form} />
              </div>
            </div>

            {/* Full Width Design List */}
            <MiwahdissDesignListSection form={form} />

            {/* Sticky/Bottom Actions */}
            <div className="flex items-center justify-end gap-4 border-t pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-32"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-32">
                Update Event
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default EditEvent;
