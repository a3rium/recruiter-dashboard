import React from "react";
import { offerColumns } from "../../../components/routes/offers/offers-table-columns";
import { OfferDataTable } from "@/components/routes/offers/offers-data-table";
import AddOfferDialog from "@/components/routes/offers/add-offer-dialog";
import EditOfferDialog from "@/components/routes/offers/edit-offer-dialog";
import { trpcServer } from "@/app/_trpc/caller";
import { OfferProvider } from "@/components/routes/offers/offer-provider";
import { SelectedDialogProvider } from "@/components/routes/providers/selected-dialog-provider";
import DeleteOfferDialog from "@/components/routes/offers/delete-offer-dialog";

async function ProspectsPage() {
  const data = await trpcServer.offers.getOfferTableData();
  return (
    <div className="container mx-auto py-10">
      <AddOfferDialog />
      <OfferProvider>
        <SelectedDialogProvider>
          <OfferDataTable columns={offerColumns} data={data.offerTableData} />
          <EditOfferDialog />
          <DeleteOfferDialog />
        </SelectedDialogProvider>
      </OfferProvider>
    </div>
  );
}

export default ProspectsPage;
