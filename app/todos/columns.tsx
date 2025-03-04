"use client";

import { Button } from "@/components/ui/button";
import { Note } from "@/interfaces/notes.interface";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import EditIcon from "@/public/icons/edit.svg";
import TrashIcon from "@/public/icons/trash.svg";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import DeleteToDoItem from "@/components/todos/delete/DeleteToDoItem";

export const noteColumn: Array<ColumnDef<Note>> = [
  {
    header: "No.",
    cell: ({ cell }) => (
      <div>{Number.parseInt(cell.id.split("_")[0], 10) + 1}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColor = {
        "to-do": "bg-[hsl(var(--destructive))]",
        doing: "bg-[hsl(var(--chart-4))]",
        done: "bg-[hsl(var(--chart-3))]",
      };
      return (
        <div className={"flex items-center gap-x-2"}>
          <span
            className={cn(
              "w-3 h-3 rounded-full",
              statusColor[row.original.status]
            )}
          />
          <span>{row.original.status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createAt",
    header: "Created at",
  },
  {
    header: "action",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <Button
          className="gap-x-2 text-primary bg-secondary hover:text-accent"
          asChild
        >
          <Link href={`/todos/${row.original.id}/edit`}>
            <EditIcon />
            Edit
          </Link>
        </Button>
        <DeleteToDoItem todoId={row.original.id} />
      </div>
    ),
  },
];
