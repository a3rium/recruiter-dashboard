import React from "react";
import { offerColumns } from "../../../components/table-columns/offers-table-columns";
import { getOfferTableData } from "@/lib/prisma-controller";
import { OfferDataTable } from "@/components/data-tables/offers-data-table";
import AddOfferDialog from "@/components/dialogs/add-offer-dialog";
import EditOfferDialog from "@/components/dialogs/edit-offer-dialog";

async function ProspectsPage() {
  const data = await getOfferTableData();
  return (
    <div className="container mx-auto py-10">
      <AddOfferDialog />
      <EditOfferDialog>
        <OfferDataTable columns={offerColumns} data={data} />
      </EditOfferDialog>
    </div>
  );
}

export default ProspectsPage;
