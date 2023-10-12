import prisma from "@/lib/client";
import { appRouter } from "@/server";

export const trpcServer = appRouter.createCaller({
  prismaClient: prisma,
  session: { user: undefined, expires: "" },
});
