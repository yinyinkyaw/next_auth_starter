"use client";

import { Note } from "@/interfaces/notes.interface";

import { ColumnDef } from "@tanstack/react-table";

export const noteColumn: Array<ColumnDef<Note>> = [
  {
    accessorKey: "id",
    header: "No.",
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
    header: "Actions",
  },
];
