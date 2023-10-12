import TrpcProvider from "@/app/_trpc/provider";
import SessionProvider from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

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
