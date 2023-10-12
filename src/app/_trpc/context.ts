import prisma from "@/lib/client";
import type { inferAsyncReturnType } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getSession } from "next-auth/react";

export async function createContext(opts: FetchCreateContextFnOptions) {
  const session = await getSession();
  const prismaClient = prisma;

  return {
    session,
    prismaClient,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
