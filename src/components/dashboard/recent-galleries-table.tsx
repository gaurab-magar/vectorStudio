import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@/components/ui/table";
import { Heart, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const galleries = [
  {
    client: "Emily Carter",
    gallery: "Johnson Wedding - Ceremony",
    photos: 124,
    favorites: 32,
    sent: "2026-04-10",
    status: "Delivered",
  },
  {
    client: "Michael Lee",
    gallery: "Corporate Headshots - TechCorp",
    photos: 48,
    favorites: 12,
    sent: "2026-04-09",
    status: "Viewed",
  },
  {
    client: "Sophia Patel",
    gallery: "Portrait Session - Spring",
    photos: 36,
    favorites: 8,
    sent: "2026-04-08",
    status: "Selecting",
  },
  {
    client: "David Kim",
    gallery: "Event - Grand Hall",
    photos: 87,
    favorites: 19,
    sent: "2026-04-07",
    status: "Complete",
  },
  {
    client: "Olivia Smith",
    gallery: "Engagement - Riverside",
    photos: 52,
    favorites: 15,
    sent: "2026-04-06",
    status: "Viewed",
  },
];

const statusColors = {
  Delivered: "bg-green-500 text-white",
  Viewed: "bg-blue-500 text-white",
  Selecting: "bg-amber-400 text-white",
  Complete: "bg-cyan-500 text-white",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function RecentGalleriesTable() {
  return (
    <div className="bg-white rounded-[0.625rem] shadow-sm p-6 flex flex-col mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Galleries</h3>
        <Link href="/galleries" className="text-cyan-600 hover:underline text-sm font-medium">View All</Link>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Client</TableHeaderCell>
            <TableHeaderCell>Gallery Name</TableHeaderCell>
            <TableHeaderCell>Photos</TableHeaderCell>
            <TableHeaderCell>Favorites</TableHeaderCell>
            <TableHeaderCell>Sent Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {galleries.map((g) => (
            <TableRow key={g.gallery}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{getInitials(g.client)}</AvatarFallback>
                  </Avatar>
                  <span>{g.client}</span>
                </div>
              </TableCell>
              <TableCell>{g.gallery}</TableCell>
              <TableCell>{g.photos}</TableCell>
              <TableCell className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-rose-500" />
                {g.favorites}
              </TableCell>
              <TableCell>{g.sent}</TableCell>
              <TableCell>
                <Badge className={statusColors[g.status as keyof typeof statusColors] || ""}>{g.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <Eye className="w-4 h-4 text-cyan-500" />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
