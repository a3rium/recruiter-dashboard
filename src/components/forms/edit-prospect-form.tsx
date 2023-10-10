"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

import * as z from "zod";
import { editProspectFormSchema } from "@/lib/zod-schemas";
import { Employee, Prospect, Request, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/lib";
import { useProspectContext } from "../providers/prospect-provider";

type EditProspectFormProps = {
  user: {
    employee: Employee | null;
  } & User;
  requests: Request[];
};

const EditProspectForm = ({ user, requests }: EditProspectFormProps) => {
  const { prospect, setCurrentProspect } = useProspectContext();
  const form = useForm<z.infer<typeof editProspectFormSchema>>({
    resolver: zodResolver(editProspectFormSchema),
    defaultValues: {
      employeeId: prospect?.employeeId ?? 0,
      firstName: prospect?.firstName,
      id: prospect?.id,
      joinedAt: prospect?.joinedAt ?? new Date(),
      lastName: prospect?.lastName,
      recruiterId: prospect?.recruiterId,
      requestId: prospect?.requestId,
      source: prospect?.source ?? "",
      status: prospect?.status,
    },
  });

  function onSubmit(values: z.infer<typeof editProspectFormSchema>) {
    console.log(values);
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
                              console.log(form);
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

export default EditProspectForm;
