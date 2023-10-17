"use client";

import { trpcClient } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/lib";
import { addProspectFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee, Request } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type AddProspectFormProps = {
  employee: Employee;
  requests: Request[];
};

const AddProspectForm = ({ employee, requests }: AddProspectFormProps) => {
  const addProspectMutation = trpcClient.prospects.addProspect.useMutation({
    onSuccess: () => {
      toast({ title: "Success! New prospect created." });
      closeDialog();
    },
    onError: (error) => {
      toast({
        title: "Error! Something went wrong.",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof addProspectFormSchema>>({
    resolver: zodResolver(addProspectFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      recruiterId: employee.id,
    },
  });

  function onSubmit(values: z.infer<typeof addProspectFormSchema>) {
    addProspectMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input placeholder="Source..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request</FormLabel>
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
                          ? requests.find(
                              (request) => request.id === field.value,
                            )?.position
                          : "Select request..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search request..." />
                      <CommandEmpty>No such request found.</CommandEmpty>
                      <CommandGroup>
                        {requests.map((request) => (
                          <CommandItem
                            value={request.position}
                            key={request.id}
                            onSelect={() => {
                              form.setValue("requestId", request.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                request.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {request.position}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddProspectForm;
