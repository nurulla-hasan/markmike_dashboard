import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Users, 
  Calendar, 
  CalendarCheck, 
  ShieldCheck
} from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/custom/data-table";
import { createColumns } from "@/components/management/miwahdiss/columns";
import type { IMiwahdissEvent } from "@/types/miwahdiss.type";

const Miwahdiss = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Events", value: "3", icon: Calendar, color: "text-blue-500", bgColor: "bg-blue-50" },
    { label: "Active Events", value: "1", icon: CalendarCheck, color: "text-green-500", bgColor: "bg-green-50" },
    { label: "Pending Submissions", value: "32", icon: Users, color: "text-orange-500", bgColor: "bg-orange-50" },
  ];

  const events: IMiwahdissEvent[] = [
    { 
      id: "1", 
      name: "4th july", 
      heroImage: "/logo.png", 
      eventDate: "25-02-2026", 
      cutoffDate: "25-02-2026", 
      status: "Draft",
      description: "",
      deliveryTimeline: "5-7 days",
      enableCheckout: true,
      productCount: 6,
      sections: []
    },
    { 
      id: "2", 
      name: "Grey", 
      heroImage: "/logo.png", 
      eventDate: "25-02-2026", 
      cutoffDate: "25-02-2026", 
      status: "Active",
      description: "",
      deliveryTimeline: "5-7 days",
      enableCheckout: true,
      productCount: 6,
      sections: []
    },
    { 
      id: "3", 
      name: "Grey", 
      heroImage: "/logo.png", 
      eventDate: "25-02-2026", 
      cutoffDate: "25-02-2026", 
      status: "Expired",
      description: "",
      deliveryTimeline: "5-7 days",
      enableCheckout: true,
      productCount: 6,
      sections: []
    },
  ];

  const columns = createColumns(navigate);

  return (
    <PageLayout>
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">MiWaahDiss Event Management</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/miwahdiss/moderation")}>
            <ShieldCheck className="h-5 w-5" />
            Moderation
            <Badge variant="destructive" className="ml-1 h-5 min-w-5 flex items-center justify-center p-0 rounded-full">32</Badge>
          </Button>
          <Button className="bg-destructive hover:bg-destructive/90 text-white font-bold" onClick={() => navigate("/miwahdiss/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Events
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter & Search */}
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events by name..." className="pl-9 bg-muted/20 border-none" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-45 bg-muted/20 border-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Events Table */}
      {/* <Card>
        <CardContent> */}
          <DataTable 
            columns={columns} 
            data={events} 
            pageSize={10}
          />
        {/* </CardContent>
      </Card> */}
    </PageLayout>
  );
};

export default Miwahdiss;
