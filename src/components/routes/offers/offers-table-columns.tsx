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
import { useOfferContext } from "./offer-provider";
import { useSelectedDialogContext } from "../providers/selected-dialog-provider";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server";

export const offerColumns: ColumnDef<
  Awaited<
    inferRouterOutputs<AppRouter>["offers"]["getOfferTableData"]["offerTableData"][0]
  >
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "offeredAt",
    header: "Date Offered",
    cell: (offeredAt) => {
      const date = offeredAt.getValue<Date>();
      const formattedDateString = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return <div>{formattedDateString}</div>;
    },
  },
  {
    accessorKey: "ctcValue",
    header: "CTC Value",
    cell: (ctcValue) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(ctcValue.getValue<number>());

      return <span className="text-right font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "offeredBy",
    header: "Offered By",
    cell: (offer) => {
      const offeredByValue = offer.row.original.offeredBy;
      return (
        <>
          {offeredByValue.firstName} {offeredByValue.lastName}
        </>
      );
    },
  },
  {
    accessorKey: "offeredTo",
    header: "Offered To",
    cell: (offer) => {
      const offeredToValue = offer.row.original.offeredTo;
      return (
        <>
          {offeredToValue.firstName} {offeredToValue.lastName}
        </>
      );
    },
  },
  {
    accessorKey: "respondedAt",
    header: "Date Responded",
    cell: (respondedAt) => {
      const date = respondedAt.getValue<Date>();
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
      const currentOffer = row.original;
      const { offer, setCurrentOffer } = useOfferContext();
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
                navigator.clipboard.writeText(currentOffer.id.toString())
              }
            >
              Copy prospect ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span
                onClick={() => {
                  setCurrentOffer(currentOffer);
                  setCurrentSelectedDialog("edit");
                }}
              >
                View/Edit offer
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span
                onClick={() => {
                  setCurrentOffer(currentOffer);
                  setCurrentSelectedDialog("delete");
                }}
              >
                Delete offer
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
