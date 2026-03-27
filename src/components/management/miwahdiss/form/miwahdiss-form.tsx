/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { miwahdissSchema, type TMiwahdissFormValues } from "@/schemas/miwahdiss.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Camera
} from "lucide-react";
import PageLayout from "@/components/common/page-layout";

interface MiwahdissFormProps {
  mode?: "add" | "edit";
  initialData?: any;
}

export function MiwahdissForm({ mode = "add", initialData }: MiwahdissFormProps) {
  const navigate = useNavigate();

  const form = useForm<TMiwahdissFormValues>({
    resolver: zodResolver(miwahdissSchema as any),
    defaultValues: initialData || {
      enableCheckout: true,
      deliveryTimeline: "5-7 days",
      sections: [{ title: "", description: "" }]
    },
  });

  const onSubmit = (values: TMiwahdissFormValues) => {
    console.log(values);
    navigate("/miwahdiss");
  };

  return (
    <PageLayout>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-10 w-10 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "add" ? "Add New Event" : "Edit Event"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="h-11 px-8 rounded-lg border-destructive text-destructive hover:bg-destructive/5 font-semibold"
          >
            Cancel
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)}
            className="h-11 px-8 rounded-lg bg-destructive hover:bg-destructive/90 text-white font-semibold"
          >
            {mode === "add" ? "Add Event" : "Update Event"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Content */}
              <Card>
                <CardContent className="space-y-6">
                  <h2 className="text-lg font-bold text-foreground">Event Content</h2>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Type here..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add branch description, operating hours, special notes..." 
                            className="min-h-40" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Hero Image</FormLabel>
                    <div className="aspect-21/9 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-2 bg-muted/20 text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                      <Camera className="h-10 w-10" />
                      <span className="text-sm font-medium">Upload image</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modular Execution */}
              <Card>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Modular Execution</h2>
                    <Button type="button" variant="destructive" size="sm" className="font-bold">
                      Add Section
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <FormLabel>Section Title</FormLabel>
                      <Input placeholder="Type here..." />
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Description</FormLabel>
                      <Textarea placeholder="Add branch description, operating hours, special notes..." className="min-h-30" />
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Grouped Catalog Item</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Add Catalog Item" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="item1">Catalog Item 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-6">
              {/* Event Dates */}
              <Card>
                <CardContent className="space-y-4">
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Event Dates</h2>
                  
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-bold text-muted-foreground uppercase">Event Date</FormLabel>
                        <FormControl>
                          <Input placeholder="5-7 days" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cutoffDate"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-bold text-muted-foreground uppercase">Hard Order-off Date</FormLabel>
                        <FormControl>
                          <Input placeholder="5-7 days" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Delivery Timeline */}
              <Card>
                <CardContent className="space-y-4">
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Delivery Timeline</h2>
                  <FormField
                    control={form.control}
                    name="deliveryTimeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="5-7 days" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
                <CardContent className="space-y-6">
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Settings</h2>
                  
                  <FormField
                    control={form.control}
                    name="enableCheckout"
                    render={({ field }) => (
                      <div className="flex items-center justify-between">
                        <span>Enable Checkout</span>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </div>
                    )}
                  />

                  <div className="space-y-3">
                    <span>Optional PDF Catalog (Downloadable)</span>
                    <div className="aspect-square border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-2 bg-muted/20 text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                      <Camera className="h-10 w-10" />
                      <span className="text-sm font-medium text-center px-4">Upload image</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}
