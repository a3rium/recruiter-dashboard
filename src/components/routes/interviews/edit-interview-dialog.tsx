"use client";
import { trpcClient } from "@/app/_trpc/client";
import { useSelectedDialogContext } from "@/components/providers/selected-dialog-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import EditInterviewForm from "./edit-interview-form";

const EditInterviewDialog = () => {
  const prospects = trpcClient.helper.getProspectList.useQuery();
  const employees = trpcClient.helper.getEmployeeList.useQuery();

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
        {employees.data && prospects.data ? (
          <EditInterviewForm
            employees={employees.data}
            prospects={prospects.data}
          />
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditInterviewDialog;
