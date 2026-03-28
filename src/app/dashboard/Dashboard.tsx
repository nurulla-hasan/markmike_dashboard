import PageLayout from "@/components/common/page-layout";
import DashboardStats, { type TDashboardRole } from "@/components/dashboard/dashboard-stats";
import DashboardTrend from "@/components/dashboard/dashboard-trend";
import PlaceOrderCard from "@/components/dashboard/place-order-card";
import OrderRevenueTrend from "@/components/dashboard/order-revenue-trend";
import ActiveCompletedOrdersRatio from "@/components/dashboard/active-completed-orders-ratio";
import RecentActivity from "@/components/dashboard/recent-activity";
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Dashboard = () => {
  const [role, setRole] = useState<TDashboardRole>("super_admin");

  // Fake data to match the screenshot
  const fakeStatsData = {
    totalEarnings: "$2k",
    totalOrders: 500,
    totalStaff: 10,
    totalDigitizedLogos: 500
  };

  return (
    <PageLayout>
      <div className="space-y-6 p-2">
        {/* Role Switcher for Demo Purposes */}
        <div className="flex justify-end mb-4">
          <div className="w-64">
            <Select 
              value={role} 
              onValueChange={(v) => setRole(v as TDashboardRole)}
            >
              <SelectTrigger className="bg-card border-none shadow-sm rounded-xl">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="pos_staff">POS Staff</SelectItem>
                <SelectItem value="production_staff">Production Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Conditional Dashboard Rendering */}
        {role === "super_admin" && (
          <>
            <DashboardStats role="super_admin" data={fakeStatsData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <OrderRevenueTrend />
              </div>
              <div className="lg:col-span-1">
                <ActiveCompletedOrdersRatio />
              </div>
            </div>
            <RecentActivity />
          </>
        )}

        {role === "pos_staff" && (
          <>
            <DashboardStats role="pos_staff" />
            <div className="grid grid-cols-1 gap-6">
              <DashboardTrend title="Order Trend" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <PlaceOrderCard />
              </div>
            </div>
          </>
        )}

        {role === "production_staff" && (
          <>
            <DashboardStats role="production_staff" />
            <div className="grid grid-cols-1 gap-6">
              <DashboardTrend title="Production trend" />
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Dashboard;
