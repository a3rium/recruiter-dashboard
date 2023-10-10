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
import AddRequestForm from "../forms/add-request-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getCustomerList,
  getDepartmentList,
  getUserWithEmail,
} from "@/lib/prisma-controller";

const AddRequestDialog = async () => {
  let userEmail = "";
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  if (!session.user || !session.user.email) {
    //handle session error
  } else {
    userEmail = session.user.email;
  }

  const currentUser = await getUserWithEmail(userEmail);
  const departmentList = await getDepartmentList();
  const customerList = await getCustomerList();

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
          user={currentUser}
          customers={customerList}
          departments={departmentList}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddRequestDialog;
