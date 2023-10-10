import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";

import { getEmployeeList, getProspectList } from "@/lib/prisma-controller";
import { DepartmentProvider } from "../providers/department-provider";
import EditDepartmentForm from "../forms/edit-department-form";

type EditInterviewDialogProps = {
  children: ReactNode;
};

const EditDepartmentDialog = async ({ children }: EditInterviewDialogProps) => {
  const employeeList = await getEmployeeList();
  const prospectList = await getProspectList();

  return (
    <Dialog>
      <DepartmentProvider>
        {children}
        <DialogContent className="sm:max-2-[425px]">
          <DialogHeader>
            <DialogTitle>View/Edit Department</DialogTitle>
            <DialogDescription>
              Edit the department from here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <EditDepartmentForm />
        </DialogContent>
      </DepartmentProvider>
    </Dialog>
  );
};

export default EditDepartmentDialog;
