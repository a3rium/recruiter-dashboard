"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { useSelectedDialogContext } from "@/components/providers/selected-dialog-provider";
import EditDepartmentForm from "./edit-department-form";

const EditDepartmentDialog = () => {
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
          <DialogTitle>View/Edit Department</DialogTitle>
          <DialogDescription>
            Edit the department from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <EditDepartmentForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditDepartmentDialog;
