import { getCustomerList, getDepartmentList } from "@/lib/prisma-controller";
import React from "react";
import { CustomerDataTable } from "../data-tables/customers-data-table";
import { departmentColumns } from "../table-columns/departments-table-columns";
import AddDepartmentDialog from "../dialogs/add-department-dialog";
import EditDepartmentDialog from "../dialogs/edit-department-dialog";

const CustomerPanel = async () => {
  const data = await getDepartmentList();

  return (
    <>
      <AddDepartmentDialog />
      <EditDepartmentDialog>
        <CustomerDataTable columns={departmentColumns} data={data} />
      </EditDepartmentDialog>
    </>
  );
};

export default CustomerPanel;
