import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/providers/QueryProviders";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth Starter",
  description: "Next authenticaiton with prisma ORM",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProviders>
          {modal}
          {children}
        </QueryProviders>
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
              fontFamily: "sans-serif",
              fontSize: "1rem",
              color: "hsl(var(--background))",
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
