import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRequestsList, getUserWithEmail } from "@/lib/prisma-controller";
import { ProspectProvider } from "../providers/prospect-provider";
import EditProspectForm from "../forms/edit-prospect-form";

type EditProspectDialogProps = {
  children: ReactNode;
};

const EditProspectDialog = async ({ children }: EditProspectDialogProps) => {
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
  const requestList = await getRequestsList();

  return (
    <Dialog>
      <ProspectProvider>
        {children}
        <DialogContent className="sm:max-2-[425px]">
          <DialogHeader>
            <DialogTitle>View/Edit Prospect</DialogTitle>
            <DialogDescription>
              Edit the prospect from here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <EditProspectForm user={currentUser} requests={requestList} />
        </DialogContent>
      </ProspectProvider>
    </Dialog>
  );
};

export default EditProspectDialog;
