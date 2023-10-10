import { OFFER_STATUS, PROSPECT_STATUS } from "@prisma/client";
import * as z from "zod";

export const addRequestFormSchema = z.object({
  position: z
    .string({
      required_error: "Position is required.",
    })
    .min(1),
  level: z
    .string({
      required_error: "Level is required.",
    })
    .min(1),
  budgetOpen: z.boolean().optional(),
  budgetValue: z.number().optional(),
  customerId: z.coerce
    .number({
      required_error: "Customer is required.",
    })
    .int(),
  requesterId: z
    .number({
      required_error: "Requester is required.",
    })
    .int(),
  departmentId: z.coerce
    .number({
      required_error: "Department is required.",
    })
    .int(),
});

export const editRequestFormSchema = z.object({
  id: z
    .number({
      required_error: "ID is required.",
    })
    .int(),
  createdAt: z.date().optional(),
  position: z.string().min(1).optional(),
  level: z.string().min(1).optional(),
  budgetValue: z.number().int().optional(),
  budgetOpen: z.boolean().optional(),
  customerId: z.number().int().optional(),
  requesterId: z.number().int().optional(),
  departmentId: z.number().int().optional(),
});

export const addProspectFormSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required.",
    })
    .min(1),
  lastName: z
    .string({
      required_error: "Last Name is required.",
    })
    .min(1),
  source: z.string().optional(),
  recruiterId: z.number().int(),
  requestId: z
    .number({
      required_error: "Request is required.",
    })
    .int(),
});

export const editProspectFormSchema = z.object({
  id: z
    .number({
      required_error: "ID is required.",
    })
    .int(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  source: z.string().optional(),
  joinedAt: z.date().optional(),
  recruiterId: z.number().int().optional(),
  requestId: z.number().int().optional(),
  status: z.nativeEnum(PROSPECT_STATUS).optional(),
  employeeId: z.number().int().optional(),
});

export const addInterviewFormSchema = z.object({
  conductedAt: z
    .date()
    .max(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),
  remarks: z.string().optional(),
  prospectId: z
    .number({
      required_error: "Prospect is required.",
    })
    .int(),
  interviewers: z.number().int().array().optional(),
});

export const editInterviewFormSchema = z.object({
  id: z
    .number({
      required_error: "ID is required.",
    })
    .int(),
  conductedAt: z.date().optional(),
  remarks: z.string().optional(),
  prospectId: z.number().int().optional(),
  interviewers: z.number().int().array().optional(),
});

export const addOfferFormSchema = z.object({
  ctcValue: z
    .number({
      required_error: "CTC Value is required.",
    })
    .int(),
  employeeId: z.number().int(),
  status: z.nativeEnum(OFFER_STATUS).optional(),
  prospectId: z
    .number({
      required_error: "Prospect is required.",
    })
    .int(),
  offeredAt: z.date().max(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),
  respondedAt: z
    .date()
    .max(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
    .optional(),
});

export const editOfferFormSchema = z.object({
  id: z
    .number({
      required_error: "ID is required.",
    })
    .int(),
  ctcValue: z.number().int().optional(),
  status: z.nativeEnum(OFFER_STATUS).optional(),
  offeredAt: z.date().optional(),
  respondedAt: z.date().optional(),
  employeeId: z.number().int().optional(),
  prospectId: z.number().int().optional(),
});

export const addCustomerFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1),
});

export const editCustomerFormSchema = z.object({
  id: z
    .number({
      required_error: "ID is required.",
    })
    .int(),
  name: z.string().min(1).optional(),
});

export const addDepartmentFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1),
});

export const editDepartmentFormSchema = z.object({
  id: z
    .number({
      required_error: "ID is required.",
    })
    .int(),
  name: z.string().min(1).optional(),
});
