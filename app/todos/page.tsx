import { DataTable } from "@/components/common/data-table";
import { apiInstnace, endpoints } from "@/utils/domain";
import { noteColumn } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotesPage() {
  const notes = await apiInstnace.get(`${endpoints.notes.list}`);

  return (
    <section className="p-6 bg-background dark:bg-background">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium mb-4">To Dos</h2>
        <Link href={"/todos/create"}>
          <Button>Create To-Do</Button>
        </Link>
      </div>
      <DataTable columns={noteColumn} data={notes.data} />
    </section>
  );
}
