import React from "react";
import { interviewColumns } from "../../../components/table-columns/interviews-table-columns";
import { InterviewDataTable } from "../../../components/data-tables/interviews-data-table";
import AddInterviewDialog from "@/components/dialogs/add-interview-dialog";
import { getInterviewTableData } from "@/lib/prisma-controller";
import EditInterviewDialog from "@/components/dialogs/edit-interview-dialog";

async function InterviewPage() {
  const data = await getInterviewTableData();
  return (
    <div className="container mx-auto py-10">
      <AddInterviewDialog />
      <EditInterviewDialog>
        <InterviewDataTable columns={interviewColumns} data={data} />
      </EditInterviewDialog>
    </div>
  );
}

export default InterviewPage;
