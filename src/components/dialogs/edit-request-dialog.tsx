import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";
import EditRequestForm from "@/components/forms/edit-request-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getCustomerList,
  getDepartmentList,
  getUserWithEmail,
} from "@/lib/prisma-controller";
import { RequestProvider } from "@/components/providers/request-provider";

type EditRequestDialogProps = {
  children: ReactNode;
};

const EditRequestDialog = async ({ children }: EditRequestDialogProps) => {
  let userEmail = "";
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  console.log("yo");

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
      <RequestProvider>
        {children}
        <DialogContent className="sm:max-2-[425px]">
          <DialogHeader>
            <DialogTitle>View/Edit Request</DialogTitle>
            <DialogDescription>
              Edit the request from here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <EditRequestForm
            customers={customerList}
            departments={departmentList}
            user={currentUser}
          />
        </DialogContent>
      </RequestProvider>
    </Dialog>
  );
};

export default EditRequestDialog;
