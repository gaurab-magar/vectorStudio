"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Bell, Search, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Input placeholder="Search..." className="pl-10 pr-4 py-2 rounded-md bg-gray-100 border-none focus:ring-2 focus:ring-cyan-400" />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <Button variant="ghost" className="relative p-2">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </Button>
        <div className="relative">
          <Button variant="ghost" className="flex items-center gap-2 p-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/avatars/alex.jpg" alt="Alex Morgan" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">Alex Morgan</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
          {/* Dropdown menu (Profile, Account Settings, Sign Out) would go here */}
        </div>
      </div>
    </header>
  );
}
