/* eslint-disable @typescript-eslint/no-explicit-any */
import { Wallet, Package, Clock, Activity, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type TDashboardRole = "super_admin" | "pos_staff" | "production_staff";

interface DashboardStatsProps {
  role: TDashboardRole;
  data?: any;
}

const DashboardStats = ({ role, data }: DashboardStatsProps) => {
  const getStats = () => {
    switch (role) {
      case "pos_staff":
        return [
          {
            label: "Total Sale",
            value: "$2k",
            icon: Wallet,
            bgColor: "bg-[#FFF9E5] dark:bg-yellow-500/10",
            iconColor: "text-[#FFC107] dark:text-yellow-500",
          },
          {
            label: "Total Orders",
            value: "500",
            icon: Package,
            bgColor: "bg-[#FEECEB] dark:bg-pink-500/10",
            iconColor: "text-[#FF808B] dark:text-pink-500",
          },
        ];
      case "production_staff":
        return [
          {
            label: "Pending",
            value: "10",
            icon: Package,
            bgColor: "bg-[#FEECEB] dark:bg-pink-500/10",
            iconColor: "text-[#FF808B] dark:text-pink-500",
          },
          {
            label: "In progress",
            value: "10",
            icon: Clock,
            bgColor: "bg-[#FFF9E5] dark:bg-yellow-500/10",
            iconColor: "text-[#FFC107] dark:text-yellow-500",
          },
          {
            label: "Completed",
            value: "10",
            icon: CheckCircle2,
            bgColor: "bg-[#E5FBF3] dark:bg-emerald-500/10",
            iconColor: "text-[#00C292] dark:text-emerald-500",
          },
        ];
      default: // super_admin
        return [
          {
            label: "Total Earnings",
            value: data?.totalEarnings || "$2k",
            icon: Wallet,
            bgColor: "bg-[#FFF9E5] dark:bg-yellow-500/10",
            iconColor: "text-[#FFC107] dark:text-yellow-500",
          },
          {
            label: "Total Orders",
            value: data?.totalOrders?.toString() || "500",
            icon: Package,
            bgColor: "bg-[#FEECEB] dark:bg-pink-500/10",
            iconColor: "text-[#FF808B] dark:text-pink-500",
          },
          {
            label: "Total Staff",
            value: data?.totalStaff?.toString() || "10",
            icon: Activity,
            bgColor: "bg-[#E5FBF3] dark:bg-emerald-500/10",
            iconColor: "text-[#00C292] dark:text-emerald-500",
          },
          {
            label: "Total Digitized Logos",
            value: data?.totalDigitizedLogos?.toString() || "500",
            icon: Activity,
            bgColor: "bg-[#E0F7FA] dark:bg-cyan-500/10",
            iconColor: "text-[#00BCD4] dark:text-cyan-500",
          },
        ];
    }
  };

  const items = getStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((s, idx) => (
        <Card
          key={idx}
        >
          <CardContent>
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="p-2 w-fit rounded-lg bg-muted">
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>

              <div className="space-y-1">
                <span className="text-3xl font-bold text-foreground block">
                  {s.value}
                </span>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
