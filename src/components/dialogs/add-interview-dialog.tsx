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
import AddInterviewForm from "../forms/add-interview-form";
import { getEmployeeList, getProspectList } from "@/lib/prisma-controller";

const AddInterviewDialog = async () => {
  const prospectList = await getProspectList();
  const employeeList = await getEmployeeList();

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
        <AddInterviewForm prospects={prospectList} employees={employeeList} />
      </DialogContent>
    </Dialog>
  );
};

export default AddInterviewDialog;
