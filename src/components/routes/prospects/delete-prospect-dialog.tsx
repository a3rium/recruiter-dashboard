"use client";
import { useSelectedDialogContext } from "@/components/providers/selected-dialog-provider";
import { ProspectProvider } from "@/components/routes/prospects/prospect-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import DeleteProspectForm from "./delete-prospect-form";

const DeleteProspectDialog = () => {
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
      <ProspectProvider>
        <DialogContent className="sm:max-2-[425px]">
          <DialogHeader>
            <DialogTitle>View/Delete Prospect</DialogTitle>
            <DialogDescription>
              Are you sure you wish to delete this prospect?
            </DialogDescription>
          </DialogHeader>
          <DeleteProspectForm />
        </DialogContent>
      </ProspectProvider>
    </Dialog>
  );
};

export default DeleteProspectDialog;
