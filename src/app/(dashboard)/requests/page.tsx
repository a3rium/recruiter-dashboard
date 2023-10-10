import { requestColumns } from "@/components/table-columns/requests-table-columns";
import { RequestDataTable } from "@/components/data-tables/requests-data-table";
import AddRequestDialog from "@/components/dialogs/add-request-dialog";
import { getRequestTableData } from "@/lib/prisma-controller";

import EditRequestDialog from "@/components/dialogs/edit-request-dialog";

async function RequestPage() {
  const data = await getRequestTableData();

  return (
    <div className="container mx-auto py-10">
      <AddRequestDialog />
      <EditRequestDialog>
        <RequestDataTable columns={requestColumns} data={data} />
      </EditRequestDialog>
    </div>
  );
}

export default RequestPage;
