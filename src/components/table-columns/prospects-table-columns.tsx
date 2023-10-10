"use client";

import { ProspectData } from "@/lib/types/prospect-with-data.type";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProspectContext } from "../providers/prospect-provider";
import { DialogTrigger } from "../ui/dialog";

export const prospectColumns: ColumnDef<ProspectData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "prospectName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: "requestId",
    header: "Request No.",
  },
  {
    accessorKey: "recruiter",
    header: "Recruiter Name",
    cell: (recruiter) => {
      const recruiterValue = recruiter.getValue<ProspectData["recruiter"]>();
      return (
        <>
          {recruiterValue.firstName} {recruiterValue.lastName}
        </>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "joinedAt",
    header: "Join Date",
    cell: (joinedAt) => {
      const date = joinedAt.getValue<Date>();
      const formattedDateString = date?.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return <div>{formattedDateString}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const currentProspect = row.original;
      const { prospect, setCurrentProspect } = useProspectContext();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(currentProspect.id.toString())
              }
            >
              Copy prospect ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View interviews</DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <span onClick={() => setCurrentProspect(currentProspect)}>
                  View/Edit prospect
                </span>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
