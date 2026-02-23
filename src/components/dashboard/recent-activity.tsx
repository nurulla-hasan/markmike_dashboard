import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ShoppingCart, FileText, CheckCircle2 } from "lucide-react";

const activities = [
  {
    id: 1,
    message: "A new message has arrived",
    time: "8:00am, today",
    action: "New order placed",
    actionColor: "text-red-500 dark:text-red-400",
    icon: ShoppingCart,
    iconBg: "bg-red-100 dark:bg-red-900/20",
    iconColor: "text-red-500 dark:text-red-400"
  },
  {
    id: 2,
    message: "A new message has arrived",
    time: "8:00am, today",
    action: "New quote requested",
    actionColor: "text-red-500 dark:text-red-400",
    icon: FileText,
    iconBg: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-500 dark:text-orange-400"
  },
  {
    id: 3,
    message: "A new message has arrived",
    time: "8:00am, today",
    action: "Logo digitized completed",
    actionColor: "text-red-500 dark:text-red-400",
    icon: CheckCircle2,
    iconBg: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-500 dark:text-green-400"
  },
  {
    id: 4,
    message: "A new message has arrived",
    time: "9:30am, today",
    action: "Payment received",
    actionColor: "text-red-500 dark:text-red-400",
    icon: MessageSquare,
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-500 dark:text-blue-400"
  }
];

const RecentActivity = () => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:border-border hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${activity.iconBg} ${activity.iconColor}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground font-medium">
                      {activity.message}
                    </p>
                    <span className="text-xs text-muted-foreground">• {activity.time}</span>
                  </div>
                  <p className={`text-base font-semibold ${activity.actionColor}`}>
                    {activity.action}
                  </p>
                </div>
              </div>
              
              <Button variant="outline">
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
