"use client";

import { trpcClient } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { closeDialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { deleteDepartmentFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDepartmentContext } from "./department-provider";

const DeleteDepartmentForm = () => {
  const router = useRouter();
  const deleteDepartmentMutation =
    trpcClient.departments.deleteDepartment.useMutation({
      onSuccess: () => {
        router.refresh();
        toast({ title: "Success! Department has been deleted." });
        closeDialog();
      },
      onError: (error) => {
        toast({
          title: "Error! Something went wrong.",
          description: error.message,
        });
      },
    });

  const { department, setCurrentDepartment } = useDepartmentContext();
  const form = useForm<z.infer<typeof deleteDepartmentFormSchema>>({
    resolver: zodResolver(deleteDepartmentFormSchema),
    defaultValues: {
      id: department?.id,
    },
  });

  function onSubmit(values: z.infer<typeof deleteDepartmentFormSchema>) {
    deleteDepartmentMutation.mutate(values);
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

export default DeleteDepartmentForm;
