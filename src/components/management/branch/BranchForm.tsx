/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/common/page-layout";
import { branchSchema, type TBranchFormValues } from "@/schemas/branch.schema";
import type { IBranch } from "@/types/branch.type";
import PageHeader from "@/components/ui/custom/page-header";

export function BranchForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;
  const branchData = location.state as IBranch | undefined;

  const form = useForm<TBranchFormValues>({
    resolver: zodResolver(branchSchema as any),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      mapLink: "",
      embeddedCode: "",
      status: "Active",
      printers: [],
      kiosks: [],
    },
  });

  const { fields: printerFields, append: addPrinter, remove: removePrinter } = useFieldArray({
    control: form.control,
    name: "printers",
  });

  const { fields: kioskFields, append: addKiosk, remove: removeKiosk } = useFieldArray({
    control: form.control,
    name: "kiosks",
  });

  useEffect(() => {
    if (isEdit && branchData) {
      form.reset({
        name: branchData.name,
        code: branchData.code,
        description: branchData.description || "",
        phone: branchData.phone,
        email: branchData.email,
        address: branchData.address,
        mapLink: branchData.mapLink || "",
        embeddedCode: branchData.embeddedCode || "",
        status: branchData.status,
        printers: branchData.printers || [],
        kiosks: branchData.kiosks || [],
      });
    }
  }, [isEdit, branchData, form]);

  function onSubmit(data: TBranchFormValues) {
    console.log(isEdit ? "Updating branch:" : "Creating branch:", data);
    navigate("/branch");
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <PageHeader
            title={isEdit ? "Edit Branch" : "Add New Branch"}
            showBack
            />
          <div className="flex items-center gap-4">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Identity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Identity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch Name</FormLabel>
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
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Add branch description, operating hours, special notes..." 
                              className="min-h-30 resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Contact & Location */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact & Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Type here...." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Type here...." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Physical Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address, city, parish..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4 space-y-4">
                      <h3 className="text-sm font-bold">Google Map Integration</h3>
                      <FormField
                        control={form.control}
                        name="mapLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Map Link</FormLabel>
                            <FormControl>
                              <Input placeholder="Type here...." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="embeddedCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Embedded Code</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder='<iframe src="https://www.google.com/maps/embed?..."' 
                                className="min-h-30 font-mono text-xs resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Mapping */}
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Mapping</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Printers */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold">Printer Configuration</h3>
                      {printerFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                          <div className="md:col-span-5">
                            <FormField
                              control={form.control}
                              name={`printers.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={index > 0 ? "sr-only" : ""}>Printer Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Type here" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="md:col-span-6">
                            <FormField
                              control={form.control}
                              name={`printers.${index}.ipAddress`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={index > 0 ? "sr-only" : ""}>Ip Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Type here" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="md:col-span-1">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => removePrinter(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addPrinter({ name: "", ipAddress: "" })}
                        className="text-xs h-8"
                      >
                        + Add Printer
                      </Button>
                    </div>

                    {/* Kiosks */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold">Kiosk</h3>
                      {kioskFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                          <div className="md:col-span-5">
                            <FormField
                              control={form.control}
                              name={`kiosks.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={index > 0 ? "sr-only" : ""}>Printer Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Type here" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="md:col-span-6">
                            <FormField
                              control={form.control}
                              name={`kiosks.${index}.ipAddress`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={index > 0 ? "sr-only" : ""}>Ip Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Type here" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="md:col-span-1">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => removeKiosk(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addKiosk({ name: "", ipAddress: "" })}
                      >
                        + Add Kiosk
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Status & Visibility */}
                <Card>
                  <CardHeader>
                    <CardTitle>Status & Visibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-y-0">
                          <div className="space-y-0.5">
                            <FormLabel className="text-sm font-bold">Branch Status</FormLabel>
                            <p className="text-[10px] text-muted-foreground font-normal">Make branch visible to customers</p>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value === "Active"}
                              onCheckedChange={(checked) => field.onChange(checked ? "Active" : "Inactive")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Badge variant={form.watch("status") === "Active" ? "success" : "muted"} className="font-normal rounded-sm">
                      {form.watch("status")}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Featured Image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer group">
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="p-3 rounded-full bg-muted/20 group-hover:bg-muted/30 transition-colors mb-3">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">Upload image</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default BranchForm;
