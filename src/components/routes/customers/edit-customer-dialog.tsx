"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";

import { useSelectedDialogContext } from "@/components/providers/selected-dialog-provider";
import EditCustomerForm from "./edit-customer-form";

type EditInterviewDialogProps = {
  children: ReactNode;
};

const EditCustomerDialog = () => {
  // const employeeList = trpcClient.helper.getEmployeeList.useQuery();
  // const prospectList = trpcClient.helper.getProspectList.useQuery();

  const { selectedDialog, setCurrentSelectedDialog } =
    useSelectedDialogContext();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDialog === "edit") setOpen(true);
    else {
      setOpen(false);
    }
  }, [selectedDialog]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        setCurrentSelectedDialog("");
      }}
    >
      <DialogContent className="sm:max-2-[425px]">
        <DialogHeader>
          <DialogTitle>View/Edit Customer</DialogTitle>
          <DialogDescription>
            Edit the customer from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <EditCustomerForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomerDialog;
