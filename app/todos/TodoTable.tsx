"use client";

import { DataTable } from "@/components/common/data-table";
import { apiInstnace, endpoints } from "@/utils/domain";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { noteColumn } from "./columns";

export default function TodoTable() {
  const { isPending, error, data } = useQuery({
    queryKey: ["to-dos"],
    queryFn: () => apiInstnace.get(`${endpoints.notes.list}`),
  });

  if (isPending) return <p>Loading ...</p>;

  if (error) {
    toast.error(`${error.message}`, { position: "top-right" });
    return;
  }

  return <DataTable columns={noteColumn} data={data?.data?.data} />;
}
