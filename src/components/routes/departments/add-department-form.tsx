"use client";
import { trpcClient } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { closeDialog } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { addDepartmentFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AddDepartmentForm = () => {
  const addDepartmentMutation =
    trpcClient.departments.addDepartment.useMutation({
      onSuccess: () => {
        toast({ title: "Success! New department created." });
        closeDialog();
      },
      onError: (error) => {
        toast({
          title: "Error! Something went wrong.",
          description: error.message,
        });
      },
    });

  const form = useForm<z.infer<typeof addDepartmentFormSchema>>({
    resolver: zodResolver(addDepartmentFormSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof addDepartmentFormSchema>) {
    addDepartmentMutation.mutate(values);
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

export default AddDepartmentForm;
