"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";
import superjson from "superjson";
import { trpcClient } from "./client";

const TrpcProvider = ({ children }: PropsWithChildren) => {
  const getBaseUrl = () => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
  };

  const [queryClientState] = useState(() => new QueryClient());
  const [trpcClientState] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer: superjson,
    }),
  );
  return (
    <trpcClient.Provider
      client={trpcClientState}
      queryClient={queryClientState}
    >
      <QueryClientProvider client={queryClientState}>
        {children}
      </QueryClientProvider>
    </trpcClient.Provider>
  );
};

export default TrpcProvider;
