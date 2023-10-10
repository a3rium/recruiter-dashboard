import prisma from "@/lib/client";

export const getUserWithEmail = async (email: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
    include: {
      employee: true,
    },
  });
};

export const getCustomerList = async () => {
  return await prisma.customer.findMany();
};

export const getDepartmentList = async () => {
  return await prisma.department.findMany();
};

export const getRequestsList = async () => {
  return await prisma.request.findMany();
};

export const getProspectList = async () => {
  return await prisma.prospect.findMany();
};

export const getEmployeeList = async () => {
  return await prisma.employee.findMany();
};

export const getRequestTableData = async () => {
  const requests = await prisma.request.findMany({
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
  return requests;
};

export const getProspectTableData = async () => {
  const prospects = await prisma.prospect.findMany({
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
  return prospects;
};

export const getInterviewTableData = async () => {
  const interviews = await prisma.interview.findMany({
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
  });
  return interviews;
};

export const getOfferTableData = async () => {
  return await prisma.offer.findMany({
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
};
