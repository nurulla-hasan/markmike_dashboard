 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { miwahdissSchema, type MiwahdissFormValues } from "@/schemas/miwahdiss.schema";
import { MiwahdissMediaSection } from "@/components/management/miwahdiss/add-event/miwahdiss-media-section";
import { MiwahdissInfoSection } from "@/components/management/miwahdiss/add-event/miwahdiss-info-section";
import { MiwahdissDesignUploadSection } from "@/components/management/miwahdiss/add-event/miwahdiss-design-upload-section";
import { MiwahdissDesignListSection } from "@/components/management/miwahdiss/add-event/miwahdiss-design-list-section";
import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";

export function AddEvent() {
  const navigate = useNavigate();

  const form = useForm<MiwahdissFormValues>({
    resolver: zodResolver(miwahdissSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      designs: [],
    },
  });

  const onSubmit: SubmitHandler<MiwahdissFormValues> = (data) => {
    console.log(data);
    // Submit logic here
    // navigate(-1); // Go back after success
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl space-y-8 pb-12">
        <PageHeader
          showBack
          title="Add New Event"
          description="Create a new event with images and product designs."
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
                Create Event
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default AddEvent;
