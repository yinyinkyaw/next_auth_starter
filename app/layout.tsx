import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/providers/QueryProviders";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth Starter",
  description: "Next authenticaiton with prisma ORM",
  icons: {
    icon: "/icons/edit.svg",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProviders>
              {modal}
              {children}
            </QueryProviders>
          </ThemeProvider>
        </AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              fontFamily: "rubik",
              fontSize: "0.8rem",
              color: "#fff",
            },
            success: {
              style: {
                background: "hsl(var(--chart-2))",
              },
            },
            error: {
              style: {
                background: "hsl(var(--destructive))",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
