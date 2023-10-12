import React from "react";
import { interviewColumns } from "../../../components/routes/interviews/interviews-table-columns";
import { InterviewDataTable } from "../../../components/routes/interviews/interviews-data-table";
import AddInterviewDialog from "@/components/routes/interviews/add-interview-dialog";
import EditInterviewDialog from "@/components/routes/interviews/edit-interview-dialog";
import { trpcServer } from "@/app/_trpc/caller";
import { InterviewProvider } from "@/components/routes/interviews/interview-provider";
import { SelectedDialogProvider } from "@/components/routes/providers/selected-dialog-provider";
import DeleteInterviewDialog from "@/components/routes/interviews/delete-interview-dialog";

async function InterviewPage() {
  const data = await trpcServer.interviews.getInterviewTableData();
  return (
    <div className="container mx-auto py-10">
      <AddInterviewDialog />
      <InterviewProvider>
        <SelectedDialogProvider>
          <InterviewDataTable
            columns={interviewColumns}
            data={data.interviewTableData}
          />
          <EditInterviewDialog />
          <DeleteInterviewDialog />
        </SelectedDialogProvider>
      </InterviewProvider>
    </div>
  );
}

export default InterviewPage;
