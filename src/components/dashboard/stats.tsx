import { Wallet, Package, Users, PenTool } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
};

interface StatsData {
  totalEarnings: string;
  totalOrders: number;
  totalStaff: number;
  totalDigitizedLogos: number;
}

interface StatsProps {
  data?: StatsData;
}

const Stats = ({ data }: StatsProps) => {
  const items: Stat[] = [
    { 
      label: "Total Earnings", 
      value: data?.totalEarnings || "$0", 
      icon: Wallet,
      bgColor: "bg-[#FFF9E5] dark:bg-yellow-500/10", // Light yellow
      iconColor: "text-[#FFC107] dark:text-yellow-500" 
    },
    { 
      label: "Total Orders", 
      value: data?.totalOrders?.toString() || "0", 
      icon: Package,
      bgColor: "bg-[#FEECEB] dark:bg-pink-500/10", // Light pink
      iconColor: "text-[#FF808B] dark:text-pink-500"
    },
    { 
      label: "Total Staff", 
      value: data?.totalStaff?.toString() || "0", 
      icon: Users,
      bgColor: "bg-[#E5FBF3] dark:bg-emerald-500/10", // Light green
      iconColor: "text-[#00C292] dark:text-emerald-500"
    },
    { 
      label: "Total Digitized Logos", 
      value: data?.totalDigitizedLogos?.toString() || "0", 
      icon: PenTool,
      bgColor: "bg-[#E0F7FA] dark:bg-cyan-500/10", // Light cyan
      iconColor: "text-[#00BCD4] dark:text-cyan-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((s, idx) => (
        <div 
          key={idx} 
          className={`rounded-2xl p-6 ${s.bgColor} border-none shadow-sm transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex flex-col h-full justify-between space-y-4">
            <div className="p-3 w-fit rounded-xl bg-white/50 dark:bg-black/20">
                <s.icon className={`w-6 h-6 ${s.iconColor}`} />
            </div>
            
            <div>
              <span className="text-3xl font-bold text-foreground block mb-1">
                {s.value}
              </span>
              <h3 className="text-sm font-medium text-muted-foreground">
                {s.label}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
