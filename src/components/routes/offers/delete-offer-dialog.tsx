"use client";

import { useSelectedDialogContext } from "@/components/providers/selected-dialog-provider";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import DeleteOfferForm from "./delete-offer-form";

const DeleteOfferDialog = () => {
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
          <DialogTitle>View/Delete Request</DialogTitle>
          <DialogDescription>
            Are you sure you wish to delete this offer?
          </DialogDescription>
        </DialogHeader>
        <DeleteOfferForm />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOfferDialog;
