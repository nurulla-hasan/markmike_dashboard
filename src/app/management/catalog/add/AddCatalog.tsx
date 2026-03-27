/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { catalogSchema, type TCatalogFormValues } from "@/schemas/catalog.schema";
import PageLayout from "@/components/common/page-layout";
import { BasicCatalogInfo } from "@/components/management/catalog/add-catalog/basic-catalog-info";
import { Web2PrintControls } from "@/components/management/catalog/add-catalog/web2print-controls";
import { ProductSelection } from "@/components/management/catalog/add-catalog/product-selection";
import PageHeader from "@/components/ui/custom/page-header";

export function AddCatalog() {
  const navigate = useNavigate();

  const form = useForm<TCatalogFormValues>({
    resolver: zodResolver(catalogSchema as any),
    defaultValues: {
      name: "",
      type: "Retail",
      assignedTo: "",
      isActive: true,
      editorPermissions: "",
      defaultDesignTemplates: [],
      products: [],
    },
  });

  function onSubmit(data: TCatalogFormValues) {
    console.log("Creating catalog:", data);
    navigate("/catalog");
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PageHeader title="Add New Catalog" showBack/>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BasicCatalogInfo form={form} />
              <Web2PrintControls form={form} />
            </div>

            <ProductSelection />
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default AddCatalog;
