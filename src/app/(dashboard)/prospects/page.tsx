import React from "react";
import { prospectColumns } from "../../../components/table-columns/prospects-table-columns";
import { ProspectDataTable } from "../../../components/data-tables/prospects-data-table";
import AddProspectDialog from "@/components/dialogs/add-prospect-dialog";
import { getProspectTableData } from "@/lib/prisma-controller";
import EditProspectDialog from "@/components/dialogs/edit-prospect-dialog";

async function ProspectsPage() {
  const data = await getProspectTableData();
  return (
    <div className="container mx-auto py-10">
      <AddProspectDialog />
      <EditProspectDialog>
        <ProspectDataTable columns={prospectColumns} data={data} />
      </EditProspectDialog>
    </div>
  );
}

export default ProspectsPage;
