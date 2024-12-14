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
import { ListTodo, UserRound } from "lucide-react";

export default function NavigationSidebar() {
  const { user } = useAuthStore();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <h1>Admin Dashboard</h1>
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
        <div className="flex justify-center gap-x-4">
          <Avatar>
            <AvatarImage src={user?.photoURL || ""} />
            <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p>{user?.displayName}</p>
            <p>{user?.email}</p>
            <Button
              variant="secondary"
              asChild
              className="w-full flex justify-start"
            >
              <Link href="/signin">Logout</Link>
            </Button>
          </div>
        </div>
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
];
