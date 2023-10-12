import { Context } from "@/app/_trpc/context";
import { authOptions } from "@/lib/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";
import superjson from "superjson";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuth = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session?.user || !ctx.session.user.id) {
    const newSession = await getServerSession(authOptions);
    if (!newSession?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Your session has expired. Please sign-in again.",
      });
    }
    ctx.session = newSession;
  }
  const employee = await ctx.prismaClient.employee.findUniqueOrThrow({
    where: {
      userId: ctx.session.user?.id as string,
    },
  });
  return next({
    ctx: {
      session: ctx.session,
      employee,
    },
  });
});

// Base router and procedure helpers
export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
