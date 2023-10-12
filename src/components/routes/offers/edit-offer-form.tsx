"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

import { trpcClient } from "@/app/_trpc/client";
import { Calendar } from "@/components/ui/calendar";
import { closeDialog } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { cn, getProspectNames } from "@/lib/lib";
import { editOfferFormSchema } from "@/lib/zod-schemas";
import { Employee, Prospect } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useOfferContext } from "./offer-provider";

type EditOfferFormProps = {
  employee: Employee;
  prospects: Prospect[];
};

const EditOfferForm = ({ employee, prospects }: EditOfferFormProps) => {
  const router = useRouter();
  const updateOfferMutation = trpcClient.offers.updateOffer.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({ title: "Success! Offer has been updated." });
      closeDialog();
    },
    onError: (error) => {
      toast({
        title: "Error! Something went wrong.",
        description: error.message,
      });
    },
  });

  const { offer: offerData, setCurrentOffer: setCurrentOfferData } =
    useOfferContext();
  const form = useForm<z.infer<typeof editOfferFormSchema>>({
    resolver: zodResolver(editOfferFormSchema),
    defaultValues: {
      ctcValue: offerData?.ctcValue,
      prospectId: offerData?.prospectId,
      employeeId: offerData?.employeeId,
      id: offerData?.id,
      offeredAt: offerData?.offeredAt,
      respondedAt: offerData?.respondedAt ?? undefined,
      status: offerData?.status,
    },
  });

  function onSubmit(values: z.infer<typeof editOfferFormSchema>) {
    updateOfferMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="ctcValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CTC Value</FormLabel>
              <FormControl>
                <Input placeholder="Enter value..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prospectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prospect</FormLabel>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? getProspectNames(
                              prospects.find(
                                (prospect) => prospect.id === field.value,
                              ),
                            )
                          : "Select prospect..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search prospect..." />
                      <CommandEmpty>No such prospect found.</CommandEmpty>
                      <CommandGroup>
                        {prospects.map((prospect) => (
                          <CommandItem
                            value={prospect.firstName + " " + prospect.lastName}
                            key={prospect.id}
                            onSelect={() => {
                              form.setValue("prospectId", prospect.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                prospect.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {prospect.firstName + " " + prospect.lastName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="offeredAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Offered</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="respondedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Responded</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditOfferForm;
