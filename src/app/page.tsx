
import { StatCards } from "@/components/dashboard/stat-cards";
import { Camera, LayoutDashboard, UserPlus, CalendarDays, Images, Heart } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", active: true },
  { label: "Leads", icon: UserPlus, href: "/leads" },
  { label: "Calendar", icon: CalendarDays, href: "/calendar" },
  { label: "Galleries", icon: Images, href: "/galleries" },
  { label: "Favorites", icon: Heart, href: "/favorites" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-100">
      {/* Simple Top Navigation */}
      <nav className="bg-white/80 backdrop-blur border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Camera className="w-6 h-6 text-cyan-500" />
                StudioFlow
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-cyan-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatCards />
        {/* Placeholder sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Leads (Coming Soon)</h3>
            <p>Leads table will be here.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Shoots (Coming Soon)</h3>
            <p>Calendar integration coming soon.</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Galleries (Coming Soon)</h3>
          <p>Gallery previews will be here.</p>
        </div>
      </main>
    </div>
  );
}
