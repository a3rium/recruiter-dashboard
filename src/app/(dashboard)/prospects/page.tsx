import { trpcServer } from "@/app/_trpc/caller";
import { SelectedDialogProvider } from "@/components/providers/selected-dialog-provider";
import AddProspectDialog from "@/components/routes/prospects/add-prospect-dialog";
import DeleteProspectDialog from "@/components/routes/prospects/delete-prospect-dialog";
import EditProspectDialog from "@/components/routes/prospects/edit-prospect-dialog";
import { ProspectProvider } from "@/components/routes/prospects/prospect-provider";
import { ProspectDataTable } from "@/components/routes/prospects/prospects-data-table";
import { prospectColumns } from "@/components/routes/prospects/prospects-table-columns";

async function ProspectsPage() {
  const data = await trpcServer.prospects.getProspectTableData();

  return (
    <div className="container mx-auto py-10">
      <AddProspectDialog />
      <ProspectProvider>
        <SelectedDialogProvider>
          <ProspectDataTable columns={prospectColumns} data={data} />
          <EditProspectDialog />
          <DeleteProspectDialog />
        </SelectedDialogProvider>
      </ProspectProvider>
    </div>
  );
}

export default ProspectsPage;
