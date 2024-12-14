"use client";

import NavigationSidebar from "@/components/navigation-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  console.log("user data::", user);

  // useEffect(() => {
  //   if (!user) {
  //     toast.error("You are not logged in");
  //     router.push("/signin");
  //   }
  // }, [user, router]);

  return (
    <SidebarProvider>
      <NavigationSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
