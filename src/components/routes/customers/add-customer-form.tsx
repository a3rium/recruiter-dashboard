"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpcClient } from "@/app/_trpc/client";
import { closeDialog } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { addCustomerFormSchema } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AddCustomerForm = () => {
  const addCustomerMutation = trpcClient.customers.addCustomer.useMutation({
    onSuccess: () => {
      toast({ title: "Success! New customer created." });
      closeDialog();
    },
    onError: (error) => {
      toast({
        title: "Error! Something went wrong.",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof addCustomerFormSchema>>({
    resolver: zodResolver(addCustomerFormSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof addCustomerFormSchema>) {
    addCustomerMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddCustomerForm;
