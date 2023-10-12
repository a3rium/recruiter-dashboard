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
import AddDepartmentForm from "./add-department-form";

const AddDepartmentDialog = async () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Department</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-2-[425px]">
        <DialogHeader>
          <DialogTitle>Add Department</DialogTitle>
          <DialogDescription>
            Add a new department from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <AddDepartmentForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddDepartmentDialog;
