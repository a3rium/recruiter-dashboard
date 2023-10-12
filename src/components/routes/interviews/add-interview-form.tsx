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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Check, CheckIcon, ChevronsUpDown, PlusCircleIcon } from "lucide-react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import * as z from "zod";
import { addInterviewFormSchema } from "@/lib/zod-schemas";
import { cn, getProspectNames } from "@/lib/lib";
import { Employee, Prospect } from "@prisma/client";
import { Textarea } from "../../ui/textarea";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { useRouter } from "next/navigation";
import { trpcClient } from "@/app/_trpc/client";
import { toast } from "../../ui/use-toast";
import { closeDialog } from "../../ui/dialog";

type AddInterviewFormProps = {
  prospects: Prospect[];
  employees: Employee[];
};

const AddInterviewForm = ({ prospects, employees }: AddInterviewFormProps) => {
  const router = useRouter();
  const addInterviewMutation = trpcClient.interviews.addInterview.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({ title: "Success! New interview created." });
      closeDialog();
    },
    onError: (error) => {
      toast({
        title: "Error! Something went wrong.",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof addInterviewFormSchema>>({
    resolver: zodResolver(addInterviewFormSchema),
    defaultValues: {
      conductedAt: new Date(),
      remarks: "",
    },
  });

  const selectedValues = new Set<number>();

  function onSubmit(values: z.infer<typeof addInterviewFormSchema>) {
    addInterviewMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea placeholder="Remarks..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conductedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Conducted</FormLabel>
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
          name="interviewers"
          render={() => (
            <FormItem>
              <FormLabel>Interviewers</FormLabel>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start"
                      >
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        {selectedValues?.size > 0 && (
                          <>
                            <Separator
                              orientation="vertical"
                              className="mx-2 h-4"
                            />
                            <Badge className="rounded-sm px-1 font-normal lg:hidden">
                              {selectedValues.size}
                            </Badge>
                            <div className="flex space-x-1">
                              {selectedValues.size > 4 ? (
                                <Badge className="rounded-sm px-1 font-normal">
                                  {selectedValues.size} selected
                                </Badge>
                              ) : (
                                employees
                                  .filter((employees) =>
                                    selectedValues.has(employees.id),
                                  )
                                  .map((employees) => (
                                    <Badge
                                      variant="secondary"
                                      key={employees.id}
                                      className="rounded-sm px-1 font-normal"
                                    >
                                      {employees.firstName} {employees.lastName}
                                    </Badge>
                                  ))
                              )}
                            </div>
                          </>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search employees..."
                        className="h-9"
                      />
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {employees.map((employee, index) => {
                          const isSelected = selectedValues.has(employee.id);
                          return (
                            <CommandItem
                              key={index}
                              onSelect={() => {
                                if (isSelected) {
                                  selectedValues.delete(employee.id);
                                } else {
                                  selectedValues.add(employee.id);
                                }
                                const filterValues = Array.from(selectedValues);
                                form.setValue("interviewers", filterValues);
                              }}
                            >
                              <div
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible",
                                )}
                              >
                                <CheckIcon className={cn("h-4 w-4")} />
                              </div>
                              <span>
                                {employee.firstName} {employee.lastName}
                              </span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddInterviewForm;
