import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";

import { getEmployeeList, getProspectList } from "@/lib/prisma-controller";
import { InterviewProvider } from "@/components/providers/interview-provider";
import EditInterviewForm from "../forms/edit-interview-form";

type EditInterviewDialogProps = {
  children: ReactNode;
};

const EditInterviewDialog = async ({ children }: EditInterviewDialogProps) => {
  const employeeList = await getEmployeeList();
  const prospectList = await getProspectList();

  return (
    <Dialog>
      <InterviewProvider>
        {children}
        <DialogContent className="sm:max-2-[425px]">
          <DialogHeader>
            <DialogTitle>View/Edit Request</DialogTitle>
            <DialogDescription>
              Edit the request from here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <EditInterviewForm
            employees={employeeList}
            prospects={prospectList}
          />
        </DialogContent>
      </InterviewProvider>
    </Dialog>
  );
};

export default EditInterviewDialog;
