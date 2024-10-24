"use client";

import { DataTable } from "@/components/common/data-table";
import { apiInstnace, endpoints } from "@/utils/domain";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { noteColumn } from "./columns";
import { useState } from "react";
import ConfirmationDialog from "@/components/common/confirmation-dialog";
import { useRouter } from "next/navigation";

export default function TodoTable() {
  const router = useRouter();

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["to-dos"],
    queryFn: () => apiInstnace.get(`${endpoints.notes.list}`),
  });

  const mutation = useMutation({
    mutationFn: (noteId) => {
      return apiInstnace.delete(`${endpoints.notes.delete}/${noteId}`);
    },
  });

  if (isPending) return <p>Loading ...</p>;

  if (error) {
    toast.error(`${error.message}`, { position: "top-right" });
    return;
  }

  const onDelete = () => {
    // mutation.mutate();
  };

  return (
    <>
      <DataTable columns={noteColumn} data={data?.data?.data} />
    </>
  );
}
