import { Calendar, LayoutGrid, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/common/page-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/components/ui/custom/page-header";

const CatalogView = () => {
  // const { id } = useParams();

  // Mock data for catalog details
  const catalog = {
    id: "CAT-2024-001",
    name: "4th of July Special",
    status: "Active",
    assignedTo: {
      name: "Nm Sujon",
      avatar: "/logo.png"
    },
    itemCount: 10,
    createdAt: "2024-01-15",
    appliedPermission: "Text Edit",
    templates: ["/logo.png", "/logo.png", "/logo.png", "/logo.png"],
    products: [
      { id: "1", name: "Canvas t-shirt", image: "/logo.png", masterPrice: "J$100.00", catalogPrice: "J$100.00", pricingMode: "Fixed", moq: 10, increment: 5 },
      { id: "2", name: "Hat", image: "/logo.png", masterPrice: "J$100.00", catalogPrice: "J$100.00", pricingMode: "Tier", moq: 50, increment: 10 },
    ]
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader title="Catalog Details" showBack />

        {/* Main Info Card */}
        <Card>
          <CardContent>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Left Side: Basic Info */}
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground">{catalog.name}</h2>
                  <Badge variant="success" className="font-normal rounded-sm">
                    {catalog.status}
                  </Badge>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Basic Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={catalog.assignedTo.avatar} />
                        <AvatarFallback>{catalog.assignedTo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{catalog.assignedTo.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <LayoutGrid className="h-5 w-5" />
                      <span className="text-sm font-medium">{catalog.itemCount} Items</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm font-medium">Created {catalog.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Design & Permissions */}
              <div className="space-y-4 flex-1">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Design & Permission</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Applied Permission : <span className="font-bold text-foreground">{catalog.appliedPermission}</span>
                    </p>
                    <div className="space-y-2 pt-2">
                      <p className="text-sm text-muted-foreground">Associated Templates Gallery :</p>
                      <div className="flex gap-2">
                        {catalog.templates.map((template, i) => (
                          <div key={i} className="h-12 w-12 rounded-md border bg-muted flex items-center justify-center p-1">
                            <img src={template} alt="Template" className="h-full w-full object-contain" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Catalog ID */}
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground uppercase">Catalog ID</p>
                <p className="text-lg font-bold">{catalog.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Table */}
        <div className="rounded-md border bg-muted/5 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-12.5">#</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Master price</TableHead>
                <TableHead>Catalog Price</TableHead>
                <TableHead>Pricing Mode</TableHead>
                <TableHead>MOQ</TableHead>
                <TableHead>Quantity Increment Step</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {catalog.products.map((product, index) => (
                <TableRow key={product.id} className="hover:bg-muted/10 border-none">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-muted flex items-center justify-center p-1">
                        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                      </div>
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.masterPrice}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.catalogPrice}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">{product.pricingMode}</span>
                      {product.pricingMode === "Tier" && <Info className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.moq}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.increment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
};

export default CatalogView;
