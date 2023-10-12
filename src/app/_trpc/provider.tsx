"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { trpcClient } from "./client";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";

const TrpcProvider = ({ children }: PropsWithChildren) => {
  const [queryClientState] = useState(() => new QueryClient());
  const [trpcClientState] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
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
