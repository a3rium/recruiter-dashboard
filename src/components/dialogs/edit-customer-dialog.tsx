import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";

import { getEmployeeList, getProspectList } from "@/lib/prisma-controller";
import { CustomerProvider } from "../providers/customer-provider";
import EditCustomerForm from "../forms/edit-customer-form";

type EditInterviewDialogProps = {
  children: ReactNode;
};

const EditCustomerDialog = async ({ children }: EditInterviewDialogProps) => {
  const employeeList = await getEmployeeList();
  const prospectList = await getProspectList();

  return (
    <Dialog>
      <CustomerProvider>
        {children}
        <DialogContent className="sm:max-2-[425px]">
          <DialogHeader>
            <DialogTitle>View/Edit Customer</DialogTitle>
            <DialogDescription>
              Edit the customer from here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <EditCustomerForm />
        </DialogContent>
      </CustomerProvider>
    </Dialog>
  );
};

export default EditCustomerDialog;
