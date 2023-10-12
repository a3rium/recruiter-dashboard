import React from "react";
import { prospectColumns } from "../../../components/routes/prospects/prospects-table-columns";
import { ProspectDataTable } from "../../../components/routes/prospects/prospects-data-table";
import AddProspectDialog from "@/components/routes/prospects/add-prospect-dialog";
import EditProspectDialog from "@/components/routes/prospects/edit-prospect-dialog";
import { trpcServer } from "@/app/_trpc/caller";
import { ProspectProvider } from "@/components/routes/prospects/prospect-provider";
import { SelectedDialogProvider } from "@/components/routes/providers/selected-dialog-provider";
import DeleteProspectDialog from "@/components/routes/prospects/delete-prospect-dialog";

async function ProspectsPage() {
  const data = await trpcServer.prospects.getProspectTableData();

  return (
    <div className="container mx-auto py-10">
      <AddProspectDialog />
      <ProspectProvider>
        <SelectedDialogProvider>
          <ProspectDataTable
            columns={prospectColumns}
            data={data.prospectTableData}
          />
          <EditProspectDialog />
          <DeleteProspectDialog />
        </SelectedDialogProvider>
      </ProspectProvider>
    </div>
  );
}

export default ProspectsPage;
