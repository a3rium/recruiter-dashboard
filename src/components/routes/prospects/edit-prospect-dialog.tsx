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
import { ReactNode, useEffect, useState } from "react";
import EditProspectForm from "./edit-prospect-form";

type EditProspectDialogProps = {
  children: ReactNode;
};

const EditProspectDialog = () => {
  const requests = trpcClient.helper.getRequestList.useQuery();
  const employee = trpcClient.helper.getCurrentEmployee.useQuery();

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
          <DialogTitle>View/Edit Prospect</DialogTitle>
          <DialogDescription>
            Edit the prospect from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        {requests.data && employee.data ? (
          <EditProspectForm
            employee={employee.data.currentEmployee}
            requests={requests.data.requestList}
          />
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProspectDialog;
