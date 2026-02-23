import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Completed orders", value: 150, color: "#2DD4BF" }, // Teal/Cyan
  { name: "Active orders", value: 10, color: "#FF808B" },     // Pink
];

const ActiveCompletedOrdersRatio = () => {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Active & Completed Orders Ratio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-62.5 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ 
                    borderRadius: "12px", 
                    border: "1px solid var(--border)", 
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "var(--card)",
                    color: "var(--card-foreground)"
                 }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Text (Optional, if we want to show total or something) */}
          {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-bold">160</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div> */}
        </div>
        
        {/* Custom Legend */}
        <div className="flex justify-center gap-8 mt-4">
            {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-lg font-bold text-foreground">{item.value}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveCompletedOrdersRatio;
