import PageLayout from "@/components/common/page-layout";
import Stats from "@/components/dashboard/stats";
import OrderRevenueTrend from "@/components/dashboard/order-revenue-trend";
import ActiveCompletedOrdersRatio from "@/components/dashboard/active-completed-orders-ratio";
import RecentActivity from "@/components/dashboard/recent-activity";
// import { useGetDashboardStatsQuery } from "@/redux/feature/dashboard/dashboardApi";

const Dashboard = () => {
  // const [year, setYear] = useState<string>("2026");
  // const { data: statsData } = useGetDashboardStatsQuery(year);

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
        {/* Top Stats Cards */}
        <Stats data={fakeStatsData} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderRevenueTrend />
          </div>
          <div className="lg:col-span-1">
            <ActiveCompletedOrdersRatio />
          </div>
        </div>

        {/* Recent Activity Section */}
        <RecentActivity />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
