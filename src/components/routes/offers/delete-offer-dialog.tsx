"use client";

import { useEffect, useState } from "react";
import { useSelectedDialogContext } from "../providers/selected-dialog-provider";
import { Dialog } from "@radix-ui/react-dialog";
import { RequestProvider } from "../requests/request-provider";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
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
      <RequestProvider>
        <DialogContent className="sm:max-2-[425px]">
          <DialogHeader>
            <DialogTitle>View/Delete Request</DialogTitle>
            <DialogDescription>
              Are you sure you wish to delete this offer?
            </DialogDescription>
          </DialogHeader>
          <DeleteOfferForm />
        </DialogContent>
      </RequestProvider>
    </Dialog>
  );
};

export default DeleteOfferDialog;
