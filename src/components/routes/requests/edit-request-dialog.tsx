"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import EditRequestForm from "@/components/routes/requests/edit-request-form";
import { useSelectedDialogContext } from "../providers/selected-dialog-provider";
import { trpcClient } from "@/app/_trpc/client";

const EditRequestDialog = () => {
  const departments = trpcClient.helper.getDepartmentList.useQuery();
  const customers = trpcClient.helper.getCustomerList.useQuery();

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
          <DialogTitle>View/Edit Request</DialogTitle>
          <DialogDescription>
            Edit the request from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        {departments.data && customers.data ? (
          <EditRequestForm
            customers={customers.data.customerList}
            departments={departments.data.departmentList}
          />
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditRequestDialog;
