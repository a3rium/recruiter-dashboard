"use client";

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
import { useProspectContext } from "./prospect-provider";
import { DialogTrigger } from "../../ui/dialog";
import { useSelectedDialogContext } from "../providers/selected-dialog-provider";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server";

export const prospectColumns: ColumnDef<
  Awaited<
    inferRouterOutputs<AppRouter>["prospects"]["getProspectTableData"]["prospectTableData"][0]
  >
>[] = [
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
    cell: (prospect) => {
      const recruiterValue = prospect.row.original.recruiter;
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
                navigator.clipboard.writeText(currentProspect.id.toString())
              }
            >
              Copy prospect ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View interviews</DropdownMenuItem>
            <DropdownMenuItem>
              <span
                onClick={() => {
                  setCurrentProspect(currentProspect);
                  setCurrentSelectedDialog("edit");
                }}
              >
                View/Edit prospect
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span
                onClick={() => {
                  setCurrentProspect(currentProspect);
                  setCurrentSelectedDialog("delete");
                }}
              >
                Delete prospect
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
