import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Phone, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LogoCard,
  type DigitizedLogo,
} from "@/components/management/logo/logo-card";

const DUMMY_LOGOS: DigitizedLogo[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60",
    name: "Phoenix Logo",
    count: 12,
    date: "24 Feb, 2026",
    price: 15000,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=60",
    name: "Abstract Blue",
    count: 8,
    date: "20 Feb, 2026",
    price: 12500,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&auto=format&fit=crop&q=60",
    name: "Modern Rocket",
    count: 15,
    date: "18 Feb, 2026",
    price: 18000,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60",
    name: "Minimalist Bird",
    count: 20,
    date: "15 Feb, 2026",
    price: 9000,
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1529926542502-77aceca00aa3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Creative Spark",
    count: 10,
    date: "12 Feb, 2026",
    price: 11000,
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=800&auto=format&fit=crop&q=60",
    name: "Eagle Shield",
    count: 5,
    date: "10 Feb, 2026",
    price: 25000,
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1617985562309-2aa7781f1608?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Nature Green",
    count: 14,
    date: "08 Feb, 2026",
    price: 13000,
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?w=800&auto=format&fit=crop&q=60",
    name: "Tech Solutions",
    count: 25,
    date: "05 Feb, 2026",
    price: 16500,
  },
  {
    id: "9",
    image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=60",
    name: "Gradient Wave",
    count: 9,
    date: "02 Feb, 2026",
    price: 14000,
  },
  {
    id: "10",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=60",
    name: "Marketing Peak",
    count: 18,
    date: "01 Feb, 2026",
    price: 17000,
  },
];

const UserDetails = () => {
  // Mock data based on screenshot
  const user = {
    name: "Sandals Resorts International",
    id: "cust-2054",
    status: "Contract",
    joinedDate: "2024-01-15",
    contact: "+24564654545",
    address: "Dunn's River, Ocho Rios, Jamaica",
    stats: {
      totalOrder: 847,
      totalSpent: "J$12.5M",
    },
    gctEnabled: true,
  };

  const associatedUsers = [
    { name: "Sara Jhonson", email: "Nsujon8247@gmail.com", role: "Buyer" },
    { name: "Davin Goni", email: "Nsujon8247@gmail.com", role: "Approver" },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader
          showBack
          title="User Details"
          description="View and manage detailed user information, statistics, and settings."
        />

        {/* Top Info Card */}
        <Card>
          <CardContent>
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              {/* Left Side: Basic Info */}
              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold text-foreground tracking-tight">
                      {user.name}
                    </h2>
                    <div className="text-right lg:hidden">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                        Customer ID
                      </p>
                      <p className="text-xl font-black">{user.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="text-destructive border-destructive/30 bg-destructive/5 px-4 py-1 rounded-md text-xs font-semibold uppercase tracking-wider"
                    >
                      {user.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                      <Calendar className="size-4 opacity-70" />
                      Joined {user.joinedDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-6">
                  {/* Contact Info */}
                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold text-muted-foreground/80 uppercase tracking-widest">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <Calendar className="size-5 text-muted-foreground/60" />
                        <span>Joined {user.joinedDate}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <Phone className="size-5 text-muted-foreground/60" />
                        <span>{user.contact}</span>
                      </div>
                      <div className="flex items-start gap-4 text-sm font-medium leading-relaxed">
                        <MapPin className="size-5 text-muted-foreground/60 shrink-0 mt-0.5" />
                        <span>{user.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Statistics */}
                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold text-muted-foreground/80 uppercase tracking-widest">
                      Account Statistics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">
                          Total Order:
                        </span>
                        <span className="font-semibold text-xl">
                          {user.stats.totalOrder}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">
                          Total Spent:
                        </span>
                        <span className="font-semibold text-xl">
                          {user.stats.totalSpent}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Settings */}
                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold text-muted-foreground/80 uppercase tracking-widest">
                      Settings
                    </h3>
                    <div className="flex items-center justify-between p-5 border border-muted/20 rounded-2xl bg-background shadow-xs">
                      <span className="text-sm font-semibold">
                        GCT/Tax Enabled
                      </span>
                      <Switch
                        checked={user.gctEnabled}
                        className="data-[state=checked]:bg-destructive"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: ID (Desktop) */}
              <div className="hidden lg:block text-right min-w-45">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
                  Customer ID
                </p>
                <p className="text-3xl font-black tracking-tighter">
                  {user.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="user" className="w-full">
          <TabsList>
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="catalog">Catalog & Pricing</TabsTrigger>
            <TabsTrigger value="digitized">Digitized Logo</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="mt-6">
            <Card>
              <CardContent>
                <h3 className="text-2xl font-semibold mb-6">User</h3>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="py-4 font-semibold text-foreground">
                          User
                        </TableHead>
                        <TableHead className="py-4 font-semibold text-foreground text-center">
                          Email
                        </TableHead>
                        <TableHead className="py-4 font-semibold text-foreground text-right">
                          Role
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {associatedUsers.map((item, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-muted/10 border-muted/20"
                        >
                          <TableCell className="py-4 font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell className="py-4 text-muted-foreground text-center">
                            {item.email}
                          </TableCell>
                          <TableCell className="py-4 text-right">
                            {item.role}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog">
            <Card>
              <CardContent>
                <h3 className="text-2xl font-semibold mb-6">
                  Catalog & Pricing
                </h3>
                <p className="text-muted-foreground">
                  Catalog information will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="digitized">
            <Card>
              <CardContent>
                <h3 className="text-2xl font-semibold mb-6">Digitized Logo</h3>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {DUMMY_LOGOS.map((logo) => (
                    <LogoCard key={logo.id} item={logo} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default UserDetails;
