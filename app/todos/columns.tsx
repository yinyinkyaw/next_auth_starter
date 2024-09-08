"use client";

import { Button } from "@/components/ui/button";
import { Note } from "@/interfaces/notes.interface";

import { ColumnDef } from "@tanstack/react-table";

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
  },
  {
    accessorKey: "createAt",
    header: "Created at",
  },
  {
    header: "action",
    cell: ({ cell }) => (
      <div className="flex items-center gap-x-4">
        <Button variant={"link"}>Edit</Button>
        <Button variant={"link"}>Delete</Button>
      </div>
    ),
  },
];
