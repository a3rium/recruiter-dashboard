"use client";

import { trpcClient } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { closeDialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { deleteRequestFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRequestContext } from "./request-provider";

const DeleteRequestForm = () => {
  const deleteRequestMutation = trpcClient.requests.deleteRequest.useMutation({
    onSuccess: () => {
      toast({ title: "Success! Request has been deleted." });
      closeDialog();
    },
    onError: (error) => {
      toast({
        title: "Error! Something went wrong.",
        description: error.message,
      });
    },
  });

  const { request, setCurrentRequest } = useRequestContext();
  const form = useForm<z.infer<typeof deleteRequestFormSchema>>({
    resolver: zodResolver(deleteRequestFormSchema),
    defaultValues: {
      id: request?.id,
    },
  });

  function onSubmit(values: z.infer<typeof deleteRequestFormSchema>) {
    deleteRequestMutation.mutate(values);
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
          <Button type="submit" variant={"destructive"} className="">
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default DeleteRequestForm;
