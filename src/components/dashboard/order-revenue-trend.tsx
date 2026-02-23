import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", revenue: 1000 },
  { month: "Feb", revenue: 1500 },
  { month: "Mar", revenue: 2500 },
  { month: "Apr", revenue: 3500 },
  { month: "May", revenue: 3800 },
  { month: "June", revenue: 3600 },
  { month: "Jul", revenue: 3900 },
  { month: "Aug", revenue: 4800 },
  { month: "Sep", revenue: 5000 },
  { month: "Oct", revenue: 4700 },
  { month: "Nov", revenue: 5000 },
  { month: "Dec", revenue: 5200 },
];

const OrderRevenueTrend = () => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Order Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 pl-0">
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#2979FF" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                domain={[0, 'auto']}
              />
              <Tooltip
                contentStyle={{ 
                    borderRadius: "12px", 
                    border: "1px solid var(--border)", 
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "var(--card)",
                    color: "var(--card-foreground)"
                }}
                cursor={{ stroke: "var(--border)", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2DD4BF"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#2DD4BF", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderRevenueTrend;
