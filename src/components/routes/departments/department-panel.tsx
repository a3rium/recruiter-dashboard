import { trpcServer } from "@/app/_trpc/caller";
import { SelectedDialogProvider } from "@/components/providers/selected-dialog-provider";
import AddDepartmentDialog from "./add-department-dialog";
import DeleteDepartmentDialog from "./delete-department-dialog";
import { DepartmentProvider } from "./department-provider";
import { DepartmentDataTable } from "./departments-data-table";
import { departmentColumns } from "./departments-table-columns";
import EditDepartmentDialog from "./edit-department-dialog";

const DepartmentPanel = async () => {
  const data = await trpcServer.departments.getDepartmentTableData();

  return (
    <>
      <AddDepartmentDialog />
      <DepartmentProvider>
        <SelectedDialogProvider>
          <DepartmentDataTable
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

export default DepartmentPanel;
