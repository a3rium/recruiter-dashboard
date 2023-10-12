import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import AddProspectForm from "./add-prospect-form";
import { trpcServer } from "@/app/_trpc/caller";

const AddProspectDialog = async () => {
  const requests = await trpcServer.helper.getRequestList();
  const employee = await trpcServer.helper.getCurrentEmployee();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Prospect</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-2-[425px]">
        <DialogHeader>
          <DialogTitle>Add Prospect</DialogTitle>
          <DialogDescription>
            Add a new prospect from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <AddProspectForm
          employee={employee.currentEmployee}
          requests={requests.requestList}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProspectDialog;
