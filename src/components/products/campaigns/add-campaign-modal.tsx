/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema, type TCampaignFormValues } from "@/schemas/campaign.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface AddCampaignModalProps {
  mode?: "add" | "edit";
  initialData?: any;
}

export function AddCampaignModal({ mode = "add", initialData }: AddCampaignModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<TCampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: initialData || {
      type: "General Discount",
      discountType: "Fixed",
      codeType: "Single Use",
      quantity: 200,
    },
  });

  const onSubmit = (values: TCampaignFormValues) => {
    console.log(values);
    setOpen(false);
  };

  const defaultTrigger =
    mode === "add" ? (
      <Button>
        <Plus /> Create Campaign
      </Button>
    ) : (
      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
        <Edit />
      </Button>
    );

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "add" ? "Create New Campaign" : "Edit Campaign"}
      actionTrigger={defaultTrigger}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Campaign Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Campaign Type</FormLabel>
                <FormControl>
                  <Tabs value={field.value} onValueChange={field.onChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger 
                        value="General Discount"
                      >
                        General
                      </TabsTrigger>
                      <TabsTrigger 
                        value="Controlled Access"
                      >
                        Controlled access
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campaign Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start and End Dates */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="12/12/2025"
                        {...field}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="12/12/2025"
                        {...field}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Discount Type */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Fixed">Fixed</SelectItem>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$150.00"
                  
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Restricted Branch */}
          <FormField
            control={form.control}
            name="restrictedBranch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restricted Branch</FormLabel>
                <div className="relative">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="branch1">Branch 1</SelectItem>
                      <SelectItem value="branch2">Branch 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Restricted Category */}
          <FormField
            control={form.control}
            name="restrictedCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restricted Category</FormLabel>
                <div className="relative">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cat1">Category 1</SelectItem>
                      <SelectItem value="cat2">Category 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Restricted Product */}
          <FormField
            control={form.control}
            name="restrictedProduct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restricted Product</FormLabel>
                <div className="relative">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="prod1">Product 1</SelectItem>
                      <SelectItem value="prod2">Product 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity and Redemption Code */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="200"
                  
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="redemptionCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redemption Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="SUMMER25"
                      className="h-11 rounded-lg border-input uppercase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Code Type */}
          <FormField
            control={form.control}
            name="codeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Single Use">Single Use</SelectItem>
                    <SelectItem value="Multiple Use">Multiple Use</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            <Button 
              type="submit"
              className="w-full sm:w-auto"
            >
              {mode === "add" ? "Add Campaign" : "Update Campaign"}
            </Button>
          </div>
        </form>
      </Form>
    </ModalWrapper>
  );
}
