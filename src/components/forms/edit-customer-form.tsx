"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { editCustomerFormSchema } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { useCustomerContext } from "../providers/customer-provider";

const EditCustomerForm = () => {
  const { customer, setCurrentCustomer } = useCustomerContext();
  const form = useForm<z.infer<typeof editCustomerFormSchema>>({
    resolver: zodResolver(editCustomerFormSchema),
    defaultValues: {
      id: customer?.id,
      name: customer?.name,
    },
  });

  function onSubmit(values: z.infer<typeof editCustomerFormSchema>) {
    console.log(values);
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

export default EditCustomerForm;
