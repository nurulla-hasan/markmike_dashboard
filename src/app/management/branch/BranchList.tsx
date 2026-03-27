import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Printer, CheckCircle2 } from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/ui/custom/page-header";
import { SearchInput } from "@/components/ui/custom/search-input";
import { Card, CardContent } from "@/components/ui/card";
import { BranchCard } from "@/components/management/branch/branch-card";
import type { IBranch } from "@/types/branch.type";
import { Input } from "@/components/ui/input";

const BranchList = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Branches", value: "4", icon: MapPin, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
    { label: "Active Branches", value: "4", icon: CheckCircle2, iconColor: "text-emerald-500", bgColor: "bg-emerald-50" },
    { label: "Total Printer", value: "4", icon: Printer, iconColor: "text-purple-500", bgColor: "bg-purple-50" },
    { label: "Service Coverage", value: "100%", icon: MapPin, iconColor: "text-blue-600", bgColor: "bg-blue-50" },
  ];

  const mockBranches: IBranch[] = Array(2).fill({
    id: "1",
    name: "Montego Bay Branch",
    code: "MBJ",
    status: "Active",
    address: "45 Market Street, Montego Bay, Jamaica",
    phone: "+1-876-555-0101",
    email: "nsujon@gmail.com",
    printersCount: 3,
    kiosksCount: 3,
  }).map((b, i) => ({ ...b, id: String(i + 1) }));

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            title="Branch"
            description="Manage your business branches and their equipment."
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <SearchInput placeholder="Search..." />
            <Button
              className="px-6 font-bold"
              onClick={() => navigate("/branch/add")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Branch
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Secondary Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search branches by name, code, or address..."
            className="pl-12 h-12 rounded-2xl"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {mockBranches.map((branch) => (
            <BranchCard key={branch.id} item={branch} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default BranchList;
