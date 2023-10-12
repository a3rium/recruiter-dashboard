import { trpcServer } from "@/app/_trpc/caller";
import { SelectedDialogProvider } from "@/components/providers/selected-dialog-provider";
import AddCustomerDialog from "./add-customer-dialog";
import { CustomerProvider } from "./customer-provider";
import { CustomerDataTable } from "./customers-data-table";
import { customerColumns } from "./customers-table-columns";
import DeleteCustomerDialog from "./delete-customer-dialog";
import EditCustomerDialog from "./edit-customer-dialog";

const CustomerPanel = async () => {
  const data = await trpcServer.customers.getCustomerTableData();

  return (
    <>
      <AddCustomerDialog />
      <CustomerProvider>
        <SelectedDialogProvider>
          <CustomerDataTable
            columns={customerColumns}
            data={data.customerTableData}
          />
          <EditCustomerDialog />
          <DeleteCustomerDialog />
        </SelectedDialogProvider>
      </CustomerProvider>
    </>
  );
};

export default CustomerPanel;
