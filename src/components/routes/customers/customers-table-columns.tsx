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
import { useCustomerContext } from "./customer-provider";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server";
import { useSelectedDialogContext } from "../providers/selected-dialog-provider";

export const customerColumns: ColumnDef<
  Awaited<
    inferRouterOutputs<AppRouter>["helper"]["getCustomerList"]["customerList"][0]
  >
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const currentCustomer = row.original;
      const { customer, setCurrentCustomer } = useCustomerContext();
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
                navigator.clipboard.writeText(currentCustomer.id.toString())
              }
            >
              Copy customer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View prospects</DropdownMenuItem>
            <DropdownMenuItem>
              <span
                onClick={() => {
                  setCurrentCustomer(currentCustomer);
                  setCurrentSelectedDialog("edit");
                }}
              >
                View/Edit customer
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span
                onClick={() => {
                  setCurrentCustomer(currentCustomer);
                  setCurrentSelectedDialog("delete");
                }}
              >
                Delete customer
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
