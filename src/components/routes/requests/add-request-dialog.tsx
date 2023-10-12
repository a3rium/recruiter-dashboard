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
import AddRequestForm from "./add-request-form";
import { trpcServer } from "@/app/_trpc/caller";

const AddRequestDialog = async () => {
  const departments = await trpcServer.helper.getDepartmentList();
  const customers = await trpcServer.helper.getCustomerList();
  const employee = await trpcServer.helper.getCurrentEmployee();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-2-[425px]">
        <DialogHeader>
          <DialogTitle>Add Request</DialogTitle>
          <DialogDescription>
            Add a new request from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <AddRequestForm
          employee={employee.currentEmployee}
          customers={customers.customerList}
          departments={departments.departmentList}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddRequestDialog;
