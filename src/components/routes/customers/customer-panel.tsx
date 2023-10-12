import React from "react";
import { customerColumns } from "./customers-table-columns";
import { CustomerDataTable } from "./customers-data-table";
import AddCustomerDialog from "./add-customer-dialog";
import EditCustomerDialog from "./edit-customer-dialog";
import { CustomerProvider } from "./customer-provider";
import { SelectedDialogProvider } from "../providers/selected-dialog-provider";
import DeleteCustomerDialog from "./delete-customer-dialog";
import { trpcServer } from "@/app/_trpc/caller";

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
