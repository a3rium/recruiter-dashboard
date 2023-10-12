import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCustomerForm from "./add-customer-form";

const AddCustomerDialog = async () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-2-[425px]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Add a new customer from here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <AddCustomerForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerDialog;
