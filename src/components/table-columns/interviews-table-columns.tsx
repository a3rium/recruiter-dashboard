"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InterviewData } from "@/lib/types/interview-with-data.type";
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
import { DialogTrigger } from "../ui/dialog";
import { useInterviewContext } from "../providers/interview-provider";

export const interviewColumns: ColumnDef<InterviewData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "conductedAt",
    header: "Date",
    cell: (conductedAt) => {
      const date = conductedAt.getValue<Date>();
      const formattedDateString = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return <div>{formattedDateString}</div>;
    },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "prospect",
    header: "Prospect Name",
    cell: (prospect) => {
      const prospectValue = prospect.getValue<InterviewData["prospect"]>();
      return (
        <>
          {prospectValue.firstName} {prospectValue.lastName}
        </>
      );
    },
  },
  {
    accessorKey: "interviewers",
    header: "Interviewers",
    cell: (interviewers) => {
      return interviewers
        .getValue<InterviewData["interviewers"]>()
        .map((item) => {
          return item.firstName + " " + item.lastName;
        })
        .join(", ");
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const currentInterview = row.original;
      const { interviewData, setCurrentInterviewData } = useInterviewContext();

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
                navigator.clipboard.writeText(currentInterview.id.toString())
              }
            >
              Copy prospect ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View interviews</DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger>
                <span onClick={() => setCurrentInterviewData(currentInterview)}>
                  View/Edit interview
                </span>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
