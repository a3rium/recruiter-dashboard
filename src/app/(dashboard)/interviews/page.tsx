import { trpcServer } from "@/app/_trpc/caller";
import { SelectedDialogProvider } from "@/components/providers/selected-dialog-provider";
import AddInterviewDialog from "@/components/routes/interviews/add-interview-dialog";
import DeleteInterviewDialog from "@/components/routes/interviews/delete-interview-dialog";
import EditInterviewDialog from "@/components/routes/interviews/edit-interview-dialog";
import { InterviewProvider } from "@/components/routes/interviews/interview-provider";
import { InterviewDataTable } from "@/components/routes/interviews/interviews-data-table";
import { interviewColumns } from "@/components/routes/interviews/interviews-table-columns";

async function InterviewPage() {
  const data = await trpcServer.interviews.getInterviewTableData();
  return (
    <div className="container mx-auto py-10">
      <AddInterviewDialog />
      <InterviewProvider>
        <SelectedDialogProvider>
          <InterviewDataTable columns={interviewColumns} data={data} />
          <EditInterviewDialog />
          <DeleteInterviewDialog />
        </SelectedDialogProvider>
      </InterviewProvider>
    </div>
  );
}

export default InterviewPage;
