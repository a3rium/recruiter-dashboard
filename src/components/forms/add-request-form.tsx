"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";
import type { Customer, Department, Employee, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/lib";
import { addRequestFormSchema } from "@/lib/zod-schemas";

type AddRequestFormProps = {
  user: {
    employee: Employee | null;
  } & User;
  customers: Customer[];
  departments: Department[];
};

const AddRequestForm = ({
  user,
  customers,
  departments,
}: AddRequestFormProps) => {
  const form = useForm<z.infer<typeof addRequestFormSchema>>({
    resolver: zodResolver(addRequestFormSchema),
    defaultValues: {
      requesterId: user.employee?.id,
    },
  });

  function onSubmit(values: z.infer<typeof addRequestFormSchema>) {
    console.log(values);
  }

  const watchBudgetOpen = form.watch("budgetOpen");
  useEffect(() => {
    if (!watchBudgetOpen) {
      form.register("budgetValue");
    } else {
      form.unregister("budgetValue");
    }
  }, [form, watchBudgetOpen]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Position to hire..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <FormControl>
                <Input placeholder="Level to hire..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budgetOpen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Open Budget</FormLabel>
              <FormControl>
                <div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!watchBudgetOpen ? (
          <FormField
            control={form.control}
            name="budgetValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input placeholder="Budget to hire..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
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
                          ? customers.find(
                              (customer) => customer.id === field.value,
                            )?.name
                          : "Select customer..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search customer..." />
                      <CommandEmpty>No such customer found.</CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer) => (
                          <CommandItem
                            value={customer.name}
                            key={customer.name}
                            onSelect={() => {
                              form.setValue("customerId", customer.id);
                              console.log(form);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                customer.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {customer.name}
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
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
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
                          ? departments.find(
                              (department) => department.id === field.value,
                            )?.name
                          : "Select department..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search department..." />
                      <CommandEmpty>No such department found.</CommandEmpty>
                      <CommandGroup>
                        {departments.map((department) => (
                          <CommandItem
                            value={department.name}
                            key={department.name}
                            onSelect={() => {
                              form.setValue("departmentId", department.id);
                              console.log(form);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                department.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {department.name}
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

export default AddRequestForm;
