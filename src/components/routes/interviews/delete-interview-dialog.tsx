"use client";
import { useSelectedDialogContext } from "@/components/providers/selected-dialog-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import DeleteInterviewForm from "./delete-interview-form";

const DeleteInterviewDialog = () => {
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
          <DialogTitle>View/Delete Interview</DialogTitle>
          <DialogDescription>
            Are you sure you wish to delete this interview?
          </DialogDescription>
        </DialogHeader>
        <DeleteInterviewForm />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInterviewDialog;
