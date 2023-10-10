import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";
import {
  getCustomerList,
  getDepartmentList,
  getEmployeeList,
  getProspectList,
  getUserWithEmail,
} from "@/lib/prisma-controller";
import EditOfferForm from "../forms/edit-offer-form";
import { OfferProvider } from "../providers/offer-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

type EditOfferDialogProps = {
  children: ReactNode;
};

const EditOfferDialog = async ({ children }: EditOfferDialogProps) => {
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
  const prospectList = await getProspectList();

  return (
    <Dialog>
      <OfferProvider>
        {children}
        <DialogContent className="sm:max-2-[425px]">
          <DialogHeader>
            <DialogTitle>View/Edit Request</DialogTitle>
            <DialogDescription>
              Edit the request from here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <EditOfferForm user={currentUser} prospects={prospectList} />
        </DialogContent>
      </OfferProvider>
    </Dialog>
  );
};

export default EditOfferDialog;
