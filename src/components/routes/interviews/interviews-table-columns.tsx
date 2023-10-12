"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInterviewContext } from "./interview-provider";
import { useSelectedDialogContext } from "../providers/selected-dialog-provider";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server";

export const interviewColumns: ColumnDef<
  Awaited<
    inferRouterOutputs<AppRouter>["interviews"]["getInterviewTableData"]["interviewTableData"][0]
  >
>[] = [
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
    header: "Prospect Name",
    cell: (prospect) => {
      const prospectValue = prospect.row.original.prospect;
      return (
        <>
          {prospectValue.firstName} {prospectValue.lastName}
        </>
      );
    },
  },
  {
    header: "Interviewers",
    cell: (prospect) => {
      return prospect.row.original.interviewers
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
      const { interview, setCurrentInterview } = useInterviewContext();
      const { selectedDialog, setCurrentSelectedDialog } =
        useSelectedDialogContext();

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
              <span
                onClick={() => {
                  setCurrentInterview(currentInterview);
                  setCurrentSelectedDialog("edit");
                }}
              >
                View/Edit interview
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span
                onClick={() => {
                  setCurrentInterview(currentInterview);
                  setCurrentSelectedDialog("delete");
                }}
              >
                Delete interview
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
