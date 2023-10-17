import { trpcServer } from "@/app/_trpc/caller";
import { SelectedDialogProvider } from "@/components/providers/selected-dialog-provider";
import AddOfferDialog from "@/components/routes/offers/add-offer-dialog";
import DeleteOfferDialog from "@/components/routes/offers/delete-offer-dialog";
import EditOfferDialog from "@/components/routes/offers/edit-offer-dialog";
import { OfferProvider } from "@/components/routes/offers/offer-provider";
import { OfferDataTable } from "@/components/routes/offers/offers-data-table";
import { offerColumns } from "@/components/routes/offers/offers-table-columns";

async function ProspectsPage() {
  const data = await trpcServer.offers.getOfferTableData();
  return (
    <div className="container mx-auto py-10">
      <AddOfferDialog />
      <OfferProvider>
        <SelectedDialogProvider>
          <OfferDataTable columns={offerColumns} data={data} />
          <EditOfferDialog />
          <DeleteOfferDialog />
        </SelectedDialogProvider>
      </OfferProvider>
    </div>
  );
}

export default ProspectsPage;
