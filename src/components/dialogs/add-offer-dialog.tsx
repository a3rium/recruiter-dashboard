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
import {
  getEmployeeList,
  getProspectList,
  getUserWithEmail,
} from "@/lib/prisma-controller";
import AddOfferForm from "../forms/add-offer-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

const AddOfferDialog = async () => {
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
  const prospectList = await getProspectList();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Offer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-2-[425px]">
        <DialogHeader>
          <DialogTitle>Add Offer</DialogTitle>
          <DialogDescription>
            Add a new offer from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <AddOfferForm prospects={prospectList} user={currentUser} />
      </DialogContent>
    </Dialog>
  );
};

export default AddOfferDialog;
