import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { useAuthStore } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ThemeSwitcher from "./common/theme-switcher";
import { FileText, ListTodo, LogOut, UserRound } from "lucide-react";
import { NavUser } from "./nav-user";

export default function NavigationSidebar() {
  const { user } = useAuthStore();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <h1 className="font-kanit text-xl font-bold">Admin Dashboard</h1>
          <ThemeSwitcher />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className="w-full flex justify-start"
                >
                  <Link href={item.href}>
                    {<item.icon />}
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton asChild>
              <Link href="/profile">
                <UserRound />
                Profile
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-x-2">
            <Avatar>
              <AvatarImage src={user?.photoURL || ""} />
              <AvatarFallback>
                {user?.displayName?.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{user?.displayName}</p>
              <p>{user?.email}</p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenuButton>
          <LogOut />
          Logout
        </SidebarMenuButton> */}
        {user ? <NavUser user={user} /> : null}
      </SidebarFooter>
    </Sidebar>
  );
}

const navItems = [
  {
    label: "To Do",
    href: "/todos",
    icon: ListTodo,
  },
  {
    label: "Blogs",
    href: "/blogs",
    icon: FileText,
  },
];
