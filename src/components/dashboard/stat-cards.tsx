import { UserPlus, Users, MessageSquare, Images, Heart, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    label: "New Leads",
    value: 24,
    trend: "+12%",
    trendUp: true,
    icon: UserPlus,
    iconBg: "bg-cyan-500",
  },
  {
    label: "Active Clients",
    value: 156,
    trend: "+8%",
    trendUp: true,
    icon: Users,
    iconBg: "bg-blue-500",
  },
  {
    label: "Pending Follow Ups",
    value: 8,
    trend: "-5%",
    trendUp: false,
    icon: MessageSquare,
    iconBg: "bg-amber-400",
  },
  {
    label: "Galleries Sent",
    value: 12,
    trend: "+15%",
    trendUp: true,
    icon: Images,
    iconBg: "bg-purple-500",
  },
  {
    label: "Favorites Selected",
    value: 847,
    trend: "+23%",
    trendUp: true,
    icon: Heart,
    iconBg: "bg-rose-500",
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-[0.625rem] shadow-sm p-6 flex items-center gap-4"
        >
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.iconBg} bg-opacity-15 text-xl`}>
            <stat.icon className="w-6 h-6 text-white drop-shadow" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 font-medium mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              {stat.trendUp ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={stat.trendUp ? "text-green-500" : "text-red-500"}>{stat.trend}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
