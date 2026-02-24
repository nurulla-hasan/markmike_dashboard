import { useState } from "react";
import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { ColorModal } from "@/components/products/product-attributes/color-modal";
import { SizeModal } from "@/components/products/product-attributes/size-modal";
import { MaterialModal } from "@/components/products/product-attributes/material-modal";
import { BrandModal } from "@/components/products/product-attributes/brand-modal";
import { BranchModal } from "@/components/products/product-attributes/branch-modal";

const ProductAttributes = () => {
  const [activeTab, setActiveTab] = useState("color");

  const DeleteAction = () => (
    <ConfirmationModal
      title="Delete Item?"
      description="Are you sure you want to delete this item? This action cannot be undone."
      onConfirm={() => {}}
      confirmButtonText="Delete"
      trigger={
        <Button variant="ghost" size="icon-sm" className="text-destructive">
          <Trash2  />
        </Button>
      }
    />
  );

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          title="Product Attributes"
          description="Manage your product attributes here."
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="color">Color</TabsTrigger>
              <TabsTrigger value="size">Size</TabsTrigger>
              <TabsTrigger value="material">Material</TabsTrigger>
              <TabsTrigger value="brands">Brands</TabsTrigger>
              <TabsTrigger value="branch">Branch</TabsTrigger>
            </TabsList>
            
            <div>
              {activeTab === "color" && <ColorModal />}
              {activeTab === "size" && <SizeModal />}
              {activeTab === "material" && <MaterialModal />}
              {activeTab === "brands" && <BrandModal />}
              {activeTab === "branch" && <BranchModal />}
            </div>
          </div>

          <TabsContent value="color" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Color name</TableHead>
                    <TableHead>Color code</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">Grey</TableCell>
                      <TableCell>#545454</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <ColorModal mode="edit" initialData={{ name: "Grey", code: "#545454" }} />
                          <DeleteAction />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="size" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["S", "M", "L", "XL"].map((size, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{size}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <SizeModal mode="edit" initialData={{ size }} />
                          <DeleteAction />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="material" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material Name</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Cotton", "Polyester"].map((material, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{material}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <MaterialModal mode="edit" initialData={{ name: material }} />
                          <DeleteAction />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="brands" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brands name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Nike", "Adidas"].map((brand, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{brand}</TableCell>
                      <TableCell>
                        <div className="h-8 w-12 bg-muted rounded" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <BrandModal mode="edit" initialData={{ name: brand }} />
                          <DeleteAction />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="branch" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Branch name</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Main Branch", "Downtown"].map((branch, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{branch}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <BranchModal mode="edit" initialData={{ name: branch }} />
                          <DeleteAction />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ProductAttributes;
