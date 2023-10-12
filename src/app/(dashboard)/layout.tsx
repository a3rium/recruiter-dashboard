import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   // console.log("not signed in");
  // } else {
  //   // console.log("signed in");
  // }

  return (
    <section>
      <Sidebar />
      <Header />
      <main className="ml-20 w-auto p-4">{children}</main>
    </section>
  );
}
