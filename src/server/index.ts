import { authOptions } from "@/lib/auth";
import {
  addCustomerFormSchema,
  addDepartmentFormSchema,
  addInterviewFormSchema,
  addOfferFormSchema,
  addProspectFormSchema,
  addRequestFormSchema,
  deleteCustomerFormSchema,
  deleteDepartmentFormSchema,
  deleteInterviewFormSchema,
  deleteOfferFormSchema,
  deleteProspectFormSchema,
  deleteRequestFormSchema,
  editCustomerFormSchema,
  editDepartmentFormSchema,
  editInterviewFormSchema,
  editOfferFormSchema,
  editProspectFormSchema,
  editRequestFormSchema,
} from "@/lib/zod-schemas";
import { privateProcedure, publicProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";

export const appRouter = router({
  auth: router({
    authCallback: publicProcedure.query(async (opts) => {
      const session = await getServerSession(authOptions);
      console.log(session);
      if (!session || !session.user || !session.user.email)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      opts.ctx.session = session;

      const authedUser = await opts.ctx.prismaClient.user.findUnique({
        where: {
          id: session.user.id ?? "",
        },
        include: {
          employee: true,
        },
      });

      if (!authedUser?.employee)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No Employee associated with this email address.",
        });

      return {};
    }),
  }),
  requests: router({
    getRequestTableData: privateProcedure.query(async (opts) => {
      const requestTableData = await opts.ctx.prismaClient.request.findMany({
        include: {
          requester: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return {
        requestTableData,
      };
    }),
    addRequest: privateProcedure
      .input(addRequestFormSchema)
      .mutation(async (opts) => {
        const request = await opts.ctx.prismaClient.request.create({
          data: opts.input,
        });

        return {
          request,
        };
      }),
    updateRequest: privateProcedure
      .input(editRequestFormSchema)
      .mutation(async (opts) => {
        const request = await opts.ctx.prismaClient.request.update({
          where: {
            id: opts.input.id,
          },
          data: opts.input,
        });
        return {
          request,
        };
      }),
    deleteRequest: privateProcedure
      .input(deleteRequestFormSchema)
      .mutation(async (opts) => {
        const request = await opts.ctx.prismaClient.request.delete({
          where: {
            id: opts.input.id,
          },
        });
        return {
          request,
        };
      }),
  }),
  prospects: router({
    getProspectTableData: privateProcedure.query(async (opts) => {
      const prospectTableData = await opts.ctx.prismaClient.prospect.findMany({
        include: {
          recruiter: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      return {
        prospectTableData,
      };
    }),
    addProspect: privateProcedure
      .input(addProspectFormSchema)
      .mutation(async (opts) => {
        const prospect = await opts.ctx.prismaClient.prospect.create({
          data: opts.input,
        });

        return {
          prospect,
        };
      }),
    updateProspect: privateProcedure
      .input(editProspectFormSchema)
      .mutation(async (opts) => {
        const prospect = await opts.ctx.prismaClient.prospect.update({
          where: {
            id: opts.input.id,
          },
          data: opts.input,
        });
        return {
          prospect,
        };
      }),
    deleteProspect: privateProcedure
      .input(deleteProspectFormSchema)
      .mutation(async (opts) => {
        const prospect = await opts.ctx.prismaClient.prospect.delete({
          where: {
            id: opts.input.id,
          },
        });
        return {
          prospect,
        };
      }),
  }),
  interviews: router({
    getInterviewTableData: privateProcedure.query(async (opts) => {
      const interviewTableData = await opts.ctx.prismaClient.interview.findMany(
        {
          include: {
            interviewers: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            prospect: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      );
      return {
        interviewTableData,
      };
    }),
    addInterview: privateProcedure
      .input(addInterviewFormSchema)
      .mutation(async (opts) => {
        const interview = await opts.ctx.prismaClient.interview.create({
          data: {
            conductedAt: opts.input.conductedAt,
            remarks: opts.input.remarks,
            prospect: {
              connect: { id: opts.input.prospectId },
            },
            interviewers: {
              connect: opts.input.interviewers?.map((employeeId) => {
                return { id: employeeId };
              }),
            },
          },
          include: {
            interviewers: true,
            prospect: true,
          },
        });
        return {
          interview,
        };
      }),
    updateInterview: privateProcedure
      .input(editInterviewFormSchema)
      .mutation(async (opts) => {
        const interview = await opts.ctx.prismaClient.interview.update({
          where: {
            id: opts.input.id,
          },
          data: {
            conductedAt: opts.input.conductedAt,
            remarks: opts.input.remarks,
            prospectId: opts.input.prospectId,
            interviewers: {
              set: [],
              connect: opts.input.interviewers?.map((employeeId) => {
                return { id: employeeId };
              }),
            },
          },
        });
        return {
          interview,
        };
      }),
    deleteInterview: privateProcedure
      .input(deleteInterviewFormSchema)
      .mutation(async (opts) => {
        const interview = await opts.ctx.prismaClient.interview.delete({
          where: {
            id: opts.input.id,
          },
        });
        return {
          interview,
        };
      }),
  }),
  offers: router({
    getOfferTableData: privateProcedure.query(async (opts) => {
      const offerTableData = await opts.ctx.prismaClient.offer.findMany({
        include: {
          offeredBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          offeredTo: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      return {
        offerTableData,
      };
    }),
    addOffer: privateProcedure
      .input(addOfferFormSchema)
      .mutation(async (opts) => {
        const offer = await opts.ctx.prismaClient.offer.create({
          data: opts.input,
        });
        return {
          offer,
        };
      }),
    updateOffer: privateProcedure
      .input(editOfferFormSchema)
      .mutation(async (opts) => {
        const offer = await opts.ctx.prismaClient.offer.update({
          where: {
            id: opts.input.id,
          },
          data: opts.input,
        });
        return {
          offer,
        };
      }),
    deleteOffer: privateProcedure
      .input(deleteOfferFormSchema)
      .mutation(async (opts) => {
        const offer = await opts.ctx.prismaClient.offer.delete({
          where: {
            id: opts.input.id,
          },
        });
        return {
          offer,
        };
      }),
  }),
  customers: router({
    getCustomerTableData: privateProcedure.query(async (opts) => {
      const customerTableData = await opts.ctx.prismaClient.customer.findMany(
        {},
      );
      return {
        customerTableData,
      };
    }),
    addCustomer: privateProcedure
      .input(addCustomerFormSchema)
      .mutation(async (opts) => {
        const customer = await opts.ctx.prismaClient.customer.create({
          data: opts.input,
        });
        return {
          customer,
        };
      }),
    updateCustomer: privateProcedure
      .input(editCustomerFormSchema)
      .mutation(async (opts) => {
        const customer = await opts.ctx.prismaClient.customer.update({
          where: {
            id: opts.input.id,
          },
          data: opts.input,
        });
        return {
          customer,
        };
      }),
    deleteCustomer: privateProcedure
      .input(deleteCustomerFormSchema)
      .mutation(async (opts) => {
        const customer = await opts.ctx.prismaClient.customer.delete({
          where: {
            id: opts.input.id,
          },
        });
        return {
          customer,
        };
      }),
  }),
  departments: router({
    getDepartmentTableData: privateProcedure.query(async (opts) => {
      const departmentTableData =
        await opts.ctx.prismaClient.department.findMany({});
      return {
        departmentTableData,
      };
    }),
    addDepartment: privateProcedure
      .input(addDepartmentFormSchema)
      .mutation(async (opts) => {
        const department = await opts.ctx.prismaClient.department.create({
          data: opts.input,
        });
        return {
          department,
        };
      }),
    updateDepartment: privateProcedure
      .input(editDepartmentFormSchema)
      .mutation(async (opts) => {
        const department = await opts.ctx.prismaClient.department.update({
          where: {
            id: opts.input.id,
          },
          data: opts.input,
        });
        return {
          department,
        };
      }),
    deleteDepartment: privateProcedure
      .input(deleteDepartmentFormSchema)
      .mutation(async (opts) => {
        const department = await opts.ctx.prismaClient.department.delete({
          where: {
            id: opts.input.id,
          },
        });
        return {
          department,
        };
      }),
  }),
  helper: router({
    getCurrentEmployee: privateProcedure.query(async (opts) => {
      const currentEmployee = opts.ctx.employee;
      return {
        currentEmployee,
      };
    }),

    getCustomerList: privateProcedure.query(async (opts) => {
      const customerList = await opts.ctx.prismaClient.customer.findMany();
      return {
        customerList,
      };
    }),
    getDepartmentList: privateProcedure.query(async (opts) => {
      const departmentList = await opts.ctx.prismaClient.department.findMany();
      return {
        departmentList,
      };
    }),

    getRequestList: privateProcedure.query(async (opts) => {
      const requestList = await opts.ctx.prismaClient.request.findMany();
      return { requestList };
    }),

    getProspectList: privateProcedure.query(async (opts) => {
      const prospectList = await opts.ctx.prismaClient.prospect.findMany();
      return { prospectList };
    }),

    getEmployeeList: privateProcedure.query(async (opts) => {
      const employeeList = await opts.ctx.prismaClient.employee.findMany();
      return { employeeList };
    }),
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
