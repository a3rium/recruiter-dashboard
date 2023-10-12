"use client";

import { useEffect, useState } from "react";
import { useSelectedDialogContext } from "../providers/selected-dialog-provider";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import DeleteCustomerForm from "./delete-customer-form";

const DeleteCustomerDialog = () => {
  const { selectedDialog, setCurrentSelectedDialog } =
    useSelectedDialogContext();
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (selectedDialog === "delete") setOpen(true);
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
          <DialogTitle>Delete Customer</DialogTitle>
          <DialogDescription>
            Are you sure you wish to delete this customer?
          </DialogDescription>
        </DialogHeader>
        <DeleteCustomerForm />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCustomerDialog;
