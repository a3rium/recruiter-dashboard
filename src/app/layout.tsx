import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/routes/providers/session-provider";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/routes/providers/theme-provider";
import TrpcProvider from "@/app/_trpc/provider";
import { authOptions } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recruiter Dashboard",
  description: "A dashboard app for recruiters to track their process.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // redirect
    // console.log("not signed in");
  } else {
    // console.log("signed in");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TrpcProvider>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
