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
import { editDepartmentFormSchema } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { useDepartmentContext } from "../providers/department-provider";

const EditDepartmentForm = () => {
  const { department, setCurrentDepartment } = useDepartmentContext();
  const form = useForm<z.infer<typeof editDepartmentFormSchema>>({
    resolver: zodResolver(editDepartmentFormSchema),
    defaultValues: {
      id: department?.id,
      name: department?.name,
    },
  });

  function onSubmit(values: z.infer<typeof editDepartmentFormSchema>) {
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

export default EditDepartmentForm;
