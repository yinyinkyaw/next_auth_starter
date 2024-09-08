import { Button } from "@/components/ui/button";
import Link from "next/link";
import TodoTable from "./TodoTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "To Do",
  description: "To Do list",
};
export default function NotesPage() {
  return (
    <section className="p-6 bg-background dark:bg-background">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium mb-4">To Dos</h2>
        <Link href={"/todos/create"}>
          <Button>Create To-Do</Button>
        </Link>
      </div>
      <TodoTable />
    </section>
  );
}
