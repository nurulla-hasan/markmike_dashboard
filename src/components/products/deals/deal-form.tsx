/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dealSchema } from "@/schemas/deal.schema";
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
  Plus,
  Trash2,
  ArrowLeft,
  Camera,
  Video
} from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IDeal } from "@/types/deal.type";
import { Label } from "@/components/ui/label";

interface DealFormProps {
  mode?: "add" | "edit";
  initialData?: IDeal;
}

export function DealForm({ mode = "add", initialData }: DealFormProps) {
  const navigate = useNavigate();

  const form = useForm<IDeal>({
    resolver: zodResolver(dealSchema as any),
    defaultValues: initialData || {
      includeDigitizing: false,
      showInStandoutCampaign: false,
      deliveryTimeframe: "5-7 days",
      products: [],
    },
  });

  const onSubmit = (values: IDeal) => {
    console.log(values);
    navigate("/products/deals");
  };

  return (
    <PageLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            {mode === "add" ? "Add New Deals" : "Edit Deal"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
          >
            {mode === "add" ? "Add Deals" : "Update Deal"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Media and Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Media Section */}
                <div className="space-y-4">
                  <div className="aspect-square border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-2 bg-muted/20 text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                    <Camera className="h-10 w-10" />
                    <span className="text-sm font-medium">Upload Deals Thumbnail image</span>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square rounded-xl bg-muted/40 border border-muted flex items-center justify-center text-muted-foreground">
                        <Camera className="h-5 w-5" />
                      </div>
                    ))}
                    <div className="aspect-square rounded-xl border-2 border-dashed border-muted flex items-center justify-center text-muted-foreground cursor-pointer">
                      <Plus className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Type here..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Price</FormLabel>
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
                          <Textarea placeholder="Type here..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Product Selection Section */}
              <Card>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-foreground">Add Products</h3>
                    <p className="text-sm text-muted-foreground">Select Product for standout deals</p>
                  </div>

                  <div className="flex items-end gap-6">
                    <div className="flex-1 space-y-2">
                      <Label>Select products</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Canvas t-shirt" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tshirt">Canvas t-shirt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Quantity</Label>
                      <Input placeholder="Type here..." />
                    </div>
                    <Button type="button" variant="destructive">
                      Add
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground">Product variants</h3>
                    <div className="rounded-xl border border-muted overflow-hidden">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow className="border-muted hover:bg-transparent">
                            <TableHead className="w-16 font-bold text-foreground">#</TableHead>
                            <TableHead className="font-bold text-foreground">Product</TableHead>
                            <TableHead className="font-bold text-foreground">Quantity</TableHead>
                            <TableHead className="text-right font-bold text-foreground">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-muted hover:bg-transparent">
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                  <img src="/logo.png" alt="" className="w-full h-full object-cover" />
                                </div>
                                <span className="font-medium text-foreground">Canvas t-shirt</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-foreground text-center">1</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 hover:bg-destructive/5">
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-muted hover:bg-transparent">
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                  <img src="/logo.png" alt="" className="w-full h-full object-cover" />
                                </div>
                                <span className="font-medium text-foreground">Hat</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-foreground text-center">1</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 hover:bg-destructive/5">
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Sidebar Settings */}
            <div className="space-y-6">
              {/* Digitizing */}
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">Include Digitizing</h3>
                    <FormField
                      control={form.control}
                      name="includeDigitizing"
                      render={({ field }) => (
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stitch Allowance (Number)</Label>
                    <div className="flex gap-3">
                      <FormField
                        control={form.control}
                        name="stitchAllowance"
                        render={({ field }) => (
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        )}
                      />
                      <Button type="button" variant="destructive">
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Status */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">Show in Stand Out Campaign</h3>
                    <FormField
                      control={form.control}
                      name="showInStandoutCampaign"
                      render={({ field }) => (
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Timeframe */}
              <Card>
                <CardContent className="space-y-4">
                  <h3 className="font-bold text-foreground">Estimated Delivery Timeframe</h3>
                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name="deliveryTimeframe"
                      render={({ field }) => (
                        <Input placeholder="5-7 days" {...field} />
                      )}
                    />
                    <Button type="button" variant="destructive">
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reels Video */}
              <Card>
                <CardContent className="space-y-4">
                  <h3 className="font-bold text-foreground">Featured Reels video</h3>
                  <div className="aspect-4/5 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-2 bg-muted/20 text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                    <Video className="h-10 w-10" />
                    <span className="text-sm font-medium">Upload Reel</span>
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

