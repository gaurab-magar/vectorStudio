"use client";
import { Sidebar, SidebarItem, SidebarFooter, SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard, UserPlus, Users, Images, Heart, MessageSquare, CalendarDays, BarChart3, Settings, LogOut, Camera } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", active: true },
  { label: "Leads", icon: UserPlus, href: "/leads" },
  { label: "Clients", icon: Users, href: "/clients" },
  { label: "Galleries", icon: Images, href: "/galleries" },
  { label: "Favorites", icon: Heart, href: "/favorites" },
  { label: "Follow Ups", icon: MessageSquare, href: "/follow-ups" },
  { label: "Calendar", icon: CalendarDays, href: "/calendar" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
];

const footerItems = [
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Logout", icon: LogOut, href: "/logout" },
];

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar className="fixed left-0 top-0 h-screen w-64 bg-[oklch(0.13_0.015_265)] text-white flex flex-col shadow-lg z-40">
        <div className="flex items-center gap-2 px-6 py-6 text-2xl font-bold tracking-tight">
          <Camera className="w-7 h-7 text-cyan-400" />
          <span>StudioFlow</span>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.label}
              as={Link}
              href={item.href}
              active={item.active}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-900/30 transition-colors"
              activeClassName="bg-cyan-900/60 text-cyan-300"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </SidebarItem>
          ))}
        </nav>
        <SidebarFooter className="mt-auto px-2 pb-4">
          {footerItems.map((item) => (
            <SidebarItem
              key={item.label}
              as={Link}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-900/30 transition-colors"
              activeClassName="bg-cyan-900/60 text-cyan-300"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </SidebarItem>
          ))}
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
