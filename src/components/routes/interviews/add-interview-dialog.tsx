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
import AddInterviewForm from "./add-interview-form";
import { trpcServer } from "@/app/_trpc/caller";

const AddInterviewDialog = async () => {
  const prospects = await trpcServer.helper.getProspectList();
  const employees = await trpcServer.helper.getEmployeeList();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Interview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-2-[425px]">
        <DialogHeader>
          <DialogTitle>Add Interview</DialogTitle>
          <DialogDescription>
            Add a new interview from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <AddInterviewForm
          prospects={prospects.prospectList}
          employees={employees.employeeList}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddInterviewDialog;
