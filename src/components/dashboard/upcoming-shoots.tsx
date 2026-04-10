import { CalendarDays, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const shoots = [
  {
    name: "Emily Carter",
    type: "Wedding",
    date: "2026-04-13 14:00",
    location: "Riverside Park",
  },
  {
    name: "Michael Lee",
    type: "Portrait",
    date: "2026-04-14 10:00",
    location: "Studio 5A",
  },
  {
    name: "Sophia Patel",
    type: "Corporate",
    date: "2026-04-15 09:00",
    location: "TechCorp HQ",
  },
  {
    name: "David Kim",
    type: "Event",
    date: "2026-04-16 18:00",
    location: "Grand Hall",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function UpcomingShoots() {
  return (
    <div className="bg-white rounded-[0.625rem] shadow-sm p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Upcoming Shoots</h3>
        <Link href="/calendar" className="text-cyan-600 hover:underline text-sm font-medium">View Calendar</Link>
      </div>
      <div className="space-y-4">
        {shoots.map((shoot) => (
          <div key={shoot.name + shoot.date} className="flex items-center gap-3 p-3 rounded-md bg-gray-50">
            <Avatar className="w-10 h-10">
              <AvatarFallback>{getInitials(shoot.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{shoot.name}</div>
              <Badge className="bg-cyan-500 text-white text-xs px-2 py-0.5 mt-1">{shoot.type}</Badge>
            </div>
            <div className="flex flex-col items-end text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{shoot.date}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{shoot.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
