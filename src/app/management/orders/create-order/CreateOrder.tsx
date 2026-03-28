import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/products/all-products/product-card";
import type { TProduct } from "@/types/product.type";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchInput } from "@/components/ui/custom/search-input";

const CreateOrder = () => {
  const [customerType, setCustomerType] = useState<"new" | "existing">("new");

  const mockProducts: TProduct[] = [
    {
      id: "1",
      name: "Canvas Jersey T-shirt",
      price: 70.00,
      currency: "JMD",
      rating: 4.5,
      reviews: 1500,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      colors: ["#ffffff", "#d1d5db", "#ef4444", "#4ade80", "#fef08a", "#9f1239", "#f43f5e"],
      deliveryTime: "3 days super rush delivery",
      soldCount: 1500,
    },
    {
      id: "2",
      name: "Canvas Jersey T-shirt",
      price: 70.00,
      currency: "JMD",
      rating: 4.5,
      reviews: 1500,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      colors: ["#ffffff", "#d1d5db", "#ef4444", "#4ade80", "#fef08a", "#9f1239", "#f43f5e"],
      deliveryTime: "3 days super rush delivery",
      soldCount: 1500,
    },
    {
      id: "3",
      name: "Canvas Jersey T-shirt",
      price: 70.00,
      currency: "JMD",
      rating: 4.5,
      reviews: 1500,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      colors: ["#ffffff", "#d1d5db", "#ef4444", "#4ade80", "#fef08a", "#9f1239", "#f43f5e"],
      deliveryTime: "3 days super rush delivery",
      soldCount: 1500,
    },
    {
      id: "4",
      name: "Canvas Jersey T-shirt",
      price: 70.00,
      currency: "JMD",
      rating: 4.5,
      reviews: 1500,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      colors: ["#ffffff", "#d1d5db", "#ef4444", "#4ade80", "#fef08a", "#9f1239", "#f43f5e"],
      deliveryTime: "3 days super rush delivery",
      soldCount: 1500,
    },
  ];

  return (
    <PageLayout>
        <PageHeader title="New orders" showBack />

        {/* Customer Info Section */}
        <div className="max-w-md">
          <Card>
            <CardContent>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-4">
                  <Label>Customer info</Label>
                  <Tabs 
                    value={customerType} 
                    onValueChange={(v) => setCustomerType(v as "new" | "existing")}
                    className="w-full"
                  >
                    <TabsList className="w-full">
                      <TabsTrigger value="new" className="flex-1">New customer</TabsTrigger>
                      <TabsTrigger value="existing" className="flex-1">Existing customer</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Type here" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Email</Label>
                    <Input placeholder="Type here" type="email" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Address</Label>
                    <Input placeholder="Type here" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Select Product Section */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-xl font-bold">Select product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="flex flex-col space-y-2">
              <Label>Select Category</Label>
              <Select defaultValue="t-shirt">
                <SelectTrigger>
                  <SelectValue placeholder="T-shirt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t-shirt">T-shirt</SelectItem>
                  <SelectItem value="hoodie">Hoodie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Select Sub-Category</Label>
              <Select defaultValue="t-shirt">
                <SelectTrigger>
                  <SelectValue placeholder="T-shirt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t-shirt">T-shirt</SelectItem>
                  <SelectItem value="v-neck">V-Neck</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Available Product Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <h2 className="text-xl font-bold">Available product</h2>
            <div>
              <SearchInput className="max-w-70" placeholder="Search Product" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
    </PageLayout>
  );
};

export default CreateOrder;
