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
import AddProspectForm from "../forms/add-prospect-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRequestsList, getUserWithEmail } from "@/lib/prisma-controller";

const AddProspectDialog = async () => {
  let userEmail = "xxx@xxx.com";
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
  const requestList = await getRequestsList();

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
        <AddProspectForm user={currentUser} requests={requestList} />
      </DialogContent>
    </Dialog>
  );
};

export default AddProspectDialog;
