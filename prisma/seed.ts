import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { id: "clnjvafa50000z62gpsqlta5e" },
    update: {},
    create: {
      id: "clnjvafa50000z62gpsqlta5e",
      email: "asadkothawala97@gmail.com",
      name: "Asad Kothawala",
    },
  });
  const employee = await prisma.employee.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      firstName: "Asad",
      lastName: "Kothawala",
      userId: "clnjvafa50000z62gpsqlta5e",
    },
  });
  const employee1 = await prisma.employee.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      firstName: "Mohammed",
      lastName: "Sutarwala",
      status: "CURRENT",
    },
  });

  const employee2 = await prisma.employee.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      firstName: "Murtuza",
      lastName: "Sutarwala",
      status: "CURRENT",
    },
  });
  const customer = await prisma.customer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "SBI Bank",
    },
  });
  const department = await prisma.department.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Fresh Eng",
    },
  });

  const request = await prisma.request.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      level: "L1",
      position: "Trainee Engineering",
      budgetOpen: true,
      budgetValue: 0,
      customerId: 1,
      departmentId: 1,
      requesterId: 1,
    },
  });

  const prospect = await prisma.prospect.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      firstName: "Rahul",
      lastName: "Vijan",
      requestId: 1,
      recruiterId: 1,
    },
  });
  const interview = await prisma.interview.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      conductedAt: new Date(0),
      prospectId: 1,
      interviewers: {
        connect: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      },
    },
  });
  const offer = await prisma.offer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      ctcValue: 600000,
      prospectId: 1,
      employeeId: 1,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
