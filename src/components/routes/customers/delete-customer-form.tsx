"use client";

import { trpcClient } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { closeDialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { deleteCustomerFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCustomerContext } from "./customer-provider";

const DeleteCustomerForm = () => {
  const router = useRouter();
  const deleteCustomerMutation =
    trpcClient.customers.deleteCustomer.useMutation({
      onSuccess: () => {
        router.refresh();
        toast({ title: "Success! Customer has been deleted." });
        closeDialog();
      },
      onError: (error) => {
        toast({
          title: "Error! Something went wrong.",
          description: error.message,
        });
      },
    });

  const { customer, setCurrentCustomer } = useCustomerContext();
  const form = useForm<z.infer<typeof deleteCustomerFormSchema>>({
    resolver: zodResolver(deleteCustomerFormSchema),
    defaultValues: {
      id: customer?.id,
    },
  });

  function onSubmit(values: z.infer<typeof deleteCustomerFormSchema>) {
    deleteCustomerMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <></>}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={() => closeDialog()} className="">
            Cancel
          </Button>
          <Button type="submit" className="">
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DeleteCustomerForm;
