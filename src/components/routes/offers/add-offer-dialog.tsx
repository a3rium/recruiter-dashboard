import { trpcServer } from "@/app/_trpc/caller";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddOfferForm from "./add-offer-form";

const AddOfferDialog = async () => {
  const employee = await trpcServer.helper.getCurrentEmployee();
  const prospects = await trpcServer.helper.getProspectList();

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
        <AddOfferForm
          prospects={prospects.prospectList}
          employee={employee.currentEmployee}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddOfferDialog;
