"use client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { trpcClient } from "@/app/_trpc/client";

const AuthCallbackPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const authResponse = trpcClient.authCallback.useQuery();
  if (authResponse.isSuccess) redirect(origin ? `/${origin}` : "/overview");
  if (authResponse.isError) redirect("/api/auth/signin");

  return <div>AuthCallbackPage</div>;
};

export default AuthCallbackPage;
