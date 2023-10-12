"use client";
import { trpcClient } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "../../ui/use-toast";
import { closeDialog } from "../../ui/dialog";
import { useOfferContext } from "./offer-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteOfferFormSchema } from "@/lib/zod-schemas";
import { z } from "zod";
import { Form, FormField } from "../../ui/form";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";

const DeleteOfferForm = () => {
  const router = useRouter();
  const deleteOfferMutation = trpcClient.offers.deleteOffer.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({ title: "Success! Offer has been deleted." });
      closeDialog();
    },
    onError: (error) => {
      toast({
        title: "Error! Something went wrong.",
        description: error.message,
      });
    },
  });

  const { offer, setCurrentOffer } = useOfferContext();
  const form = useForm<z.infer<typeof deleteOfferFormSchema>>({
    resolver: zodResolver(deleteOfferFormSchema),
    defaultValues: {
      id: offer?.id,
    },
  });

  function onSubmit(values: z.infer<typeof deleteOfferFormSchema>) {
    deleteOfferMutation.mutate(values);
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
export default DeleteOfferForm;
