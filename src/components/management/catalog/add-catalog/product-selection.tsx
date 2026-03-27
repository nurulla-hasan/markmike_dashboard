import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProductSelection() {
  const products = [
    { id: "1", name: "Canvas t-shirt", image: "/logo.png", basePrice: "J$100.00", pricingMode: "Fixed", moq: 10, increment: 5 },
    { id: "2", name: "Hat", image: "/logo.png", basePrice: "J$100.00", pricingMode: "Tier", moq: 50, increment: 10 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-bold">Product Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <FormItem className="md:col-span-1">
            <FormLabel>Select Product</FormLabel>
            <div className="relative">
              <Input placeholder="Search to select .." className="pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </FormItem>

          <FormItem>
            <FormLabel>Base Price</FormLabel>
            <Input placeholder="Type here...." />
          </FormItem>

          <FormItem>
            <FormLabel>Pricing Mode</FormLabel>
            <Select defaultValue="Fixed">
              <SelectTrigger>
                <SelectValue placeholder="Fixed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fixed">Fixed</SelectItem>
                <SelectItem value="Tier">Tier</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>

          <FormItem>
            <FormLabel>MOQ</FormLabel>
            <Input placeholder="Type here...." />
          </FormItem>

          <div className="flex gap-2">
            <FormItem className="flex-1">
              <FormLabel>Quantity Increment Step</FormLabel>
              <Input placeholder="Type here...." />
            </FormItem>
            <Button 
              type="button" 
              variant="destructive"
              className="h-10 px-6"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border bg-muted/10 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-12.5">#</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Pricing Mode</TableHead>
                <TableHead>MOQ</TableHead>
                <TableHead>Quantity Increment Step</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-muted flex items-center justify-center p-1">
                        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                      </div>
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.basePrice}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">{product.pricingMode}</span>
                      {product.pricingMode === "Tier" && <Info className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.moq}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.increment}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
