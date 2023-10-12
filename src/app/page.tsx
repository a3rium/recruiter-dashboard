import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="">
      <Link href={"/overview"}>
        <Button>Go to Recruiter Dashboard</Button>
      </Link>
    </main>
  );
}
