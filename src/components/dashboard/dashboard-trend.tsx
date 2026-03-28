import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", trend: 1000 },
  { month: "Feb", trend: 1500 },
  { month: "Mar", trend: 2500 },
  { month: "Apr", trend: 3500 },
  { month: "May", trend: 3800 },
  { month: "June", trend: 3600 },
  { month: "Jul", trend: 3900 },
  { month: "Aug", trend: 4800 },
  { month: "Sep", trend: 5000 },
  { month: "Oct", trend: 4700 },
  { month: "Nov", trend: 5000 },
  { month: "Dec", trend: 5200 },
];

interface DashboardTrendProps {
  title: string;
}

const DashboardTrend = ({ title }: DashboardTrendProps) => {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 pl-0">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
                itemStyle={{ color: "var(--card-foreground)" }}
                labelStyle={{ color: "var(--card-foreground)" }}
                cursor={{ stroke: "var(--border)", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="trend"
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

export default DashboardTrend;
