import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";

const leads = [
  { name: "Emily Carter", email: "emily.carter@email.com", type: "Wedding", status: "New", followUp: "2026-04-12" },
  { name: "Michael Lee", email: "michael.lee@email.com", type: "Portrait", status: "Contacted", followUp: "2026-04-13" },
  { name: "Sophia Patel", email: "sophia.patel@email.com", type: "Corporate", status: "Qualified", followUp: "2026-04-14" },
  { name: "David Kim", email: "david.kim@email.com", type: "Event", status: "Proposal Sent", followUp: "2026-04-15" },
  { name: "Olivia Smith", email: "olivia.smith@email.com", type: "Wedding", status: "Contacted", followUp: "2026-04-16" },
];

const statusColors = {
  New: "bg-cyan-500 text-white",
  Contacted: "bg-blue-500 text-white",
  Qualified: "bg-green-500 text-white",
  "Proposal Sent": "bg-purple-500 text-white",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function RecentLeadsTable() {
  return (
    <div className="bg-white rounded-[0.625rem] shadow-sm p-6 col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Leads</h3>
        <Link href="/leads" className="text-cyan-600 hover:underline text-sm font-medium">View All</Link>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Shoot Type</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Follow Up</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.email}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{getInitials(lead.name)}</AvatarFallback>
                  </Avatar>
                  <span>{lead.name}</span>
                </div>
              </TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.type}</TableCell>
              <TableCell>
                <Badge className={statusColors[lead.status as keyof typeof statusColors] || ""}>{lead.status}</Badge>
              </TableCell>
              <TableCell>{lead.followUp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
