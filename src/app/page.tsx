import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   // redirect
  //   // console.log("not signed in");
  //   redirect("/api/auth/signin");
  // } else {
  //   // console.log("signed in");
  // }

  return (
    <main className="">
      <Link href={"/overview"}>
        <Button>Go to Recruiter Dashboard</Button>
      </Link>
    </main>
  );
}
