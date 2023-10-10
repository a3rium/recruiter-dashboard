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
import { OfferData } from "@/lib/types/offer-with-data.type";
import { useOfferContext } from "../providers/offer-provider";
import { DialogTrigger } from "../ui/dialog";

export const offerColumns: ColumnDef<OfferData>[] = [
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
    cell: (offeredBy) => {
      const offeredByValue = offeredBy.getValue<OfferData["offeredBy"]>();
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
    cell: (offeredTo) => {
      const offeredToValue = offeredTo.getValue<OfferData["offeredTo"]>();
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
      const { offerData, setCurrentOfferData } = useOfferContext();

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
              <DialogTrigger>
                <span onClick={() => setCurrentOfferData(currentOffer)}>
                  View/Edit offer
                </span>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
