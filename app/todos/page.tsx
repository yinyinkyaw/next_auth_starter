import { Button } from "@/components/ui/button";
import Link from "next/link";
import TodoTable from "./TodoTable";
import { Metadata } from "next";
import AdminLayout from "@/Layout/AdminLayout";
import { PlusIcon } from "lucide-react";
import AdminHeaderBar from "@/components/common/admin/admin-header-bar";

export const metadata: Metadata = {
  title: "To Do",
  description: "To Do list",
};

export default function NotesPage() {
  return (
    <AdminLayout>
      <AdminHeaderBar
        title="To Dos"
        AppMenu={() => (
          <Button asChild>
            <Link href={"/todos/create"}>
              <PlusIcon className="w-4 h-4" />
              Create To-Do
            </Link>
          </Button>
        )}
      />
      <TodoTable />
    </AdminLayout>
  );
}
