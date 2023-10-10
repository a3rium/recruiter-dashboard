import { getCustomerList } from "@/lib/prisma-controller";
import React from "react";
import { customerColumns } from "../table-columns/customers-table-columns";
import { CustomerDataTable } from "../data-tables/customers-data-table";
import AddCustomerDialog from "../dialogs/add-customer-dialog";
import EditCustomerDialog from "../dialogs/edit-customer-dialog";

const CustomerPanel = async () => {
  const data = await getCustomerList();

  return (
    <>
      <AddCustomerDialog />
      <EditCustomerDialog>
        <CustomerDataTable columns={customerColumns} data={data} />
      </EditCustomerDialog>
    </>
  );
};

export default CustomerPanel;
