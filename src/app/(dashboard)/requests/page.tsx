import { requestColumns } from "@/components/routes/requests/requests-table-columns";
import { RequestDataTable } from "@/components/routes/requests/requests-data-table";
import AddRequestDialog from "@/components/routes/requests/add-request-dialog";
import EditRequestDialog from "@/components/routes/requests/edit-request-dialog";
import { trpcServer } from "@/app/_trpc/caller";
import { SelectedDialogProvider } from "@/components/routes/providers/selected-dialog-provider";
import DeleteRequestDialog from "@/components/routes/requests/delete-request-dialog";
import { RequestProvider } from "@/components/routes/requests/request-provider";

async function RequestPage() {
  const data = await trpcServer.requests.getRequestTableData();

  return (
    <div className="container mx-auto py-10">
      <AddRequestDialog />
      <RequestProvider>
        <SelectedDialogProvider>
          <RequestDataTable
            columns={requestColumns}
            data={data.requestTableData}
          />
          <EditRequestDialog />
          <DeleteRequestDialog />
        </SelectedDialogProvider>
      </RequestProvider>
    </div>
  );
}

export default RequestPage;
