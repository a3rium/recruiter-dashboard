"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { RequestProvider } from "@/components/routes/requests/request-provider";
import { useSelectedDialogContext } from "../providers/selected-dialog-provider";
import DeleteRequestForm from "./delete-request-form";

const DeleteRequestDialog = () => {
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
          <DialogTitle>Delete Request</DialogTitle>
          <DialogDescription>
            Are you sure you wish to delete this request?
          </DialogDescription>
        </DialogHeader>
        <DeleteRequestForm />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRequestDialog;
