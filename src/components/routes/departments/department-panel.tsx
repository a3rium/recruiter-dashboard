import React from "react";
import { CustomerDataTable } from "../customers/customers-data-table";
import { departmentColumns } from "./departments-table-columns";
import AddDepartmentDialog from "./add-department-dialog";
import EditDepartmentDialog from "./edit-department-dialog";
import DeleteDepartmentDialog from "./delete-department-dialog";
import { DepartmentProvider } from "./department-provider";
import { SelectedDialogProvider } from "../providers/selected-dialog-provider";
import { trpcServer } from "@/app/_trpc/caller";

const CustomerPanel = async () => {
  const data = await trpcServer.departments.getDepartmentTableData();

  return (
    <>
      <AddDepartmentDialog />
      <DepartmentProvider>
        <SelectedDialogProvider>
          <CustomerDataTable
            columns={departmentColumns}
            data={data.departmentTableData}
          />
          <EditDepartmentDialog />
          <DeleteDepartmentDialog />
        </SelectedDialogProvider>
      </DepartmentProvider>
    </>
  );
};

export default CustomerPanel;
