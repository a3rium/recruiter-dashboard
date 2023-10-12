import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const OverviewPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    console.log("not signed in");
    redirect("auth-callback?origin=overview");
  }

  return <div>OverviewPage</div>;
};

export default OverviewPage;
