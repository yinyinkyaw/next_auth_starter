import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { useAuthStore } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavigationSidebar() {
  const { user } = useAuthStore();
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <h1>Admin</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Button
              variant="secondary"
              asChild
              className="w-full flex justify-start"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </SidebarMenuItem>
        ))}
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
  },
];
