"use client";

import { RequestData } from "@/lib/types/request-with-data.type";
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
import { DialogTrigger } from "../ui/dialog";
import { useRequestContext } from "../providers/request-provider";

export const requestColumns: ColumnDef<RequestData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "requesterName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Requester
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => `${row.requester.firstName} ${row.requester.lastName}`,
  },
  {
    accessorKey: "budgetValue",
    header: "Budget",
    cell: (budgetValue) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(budgetValue.getValue<number>());

      return <span className="text-right font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "budgetOpen",
    header: "Open Budget",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "department.name",
    header: "Department",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: (createdAt) => {
      const date = createdAt.getValue<Date>();
      const formattedDateString = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return <span>{formattedDateString}</span>;
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const currentRequest = row.original;
      const { request, setCurrentRequest } = useRequestContext();

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
                navigator.clipboard.writeText(currentRequest.id.toString())
              }
            >
              Copy request ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View prospects</DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <span onClick={() => setCurrentRequest(currentRequest)}>
                  View/Edit request
                </span>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
