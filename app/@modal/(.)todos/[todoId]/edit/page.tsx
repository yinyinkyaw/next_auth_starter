"use client";

import EditForm from "@/components/todos/edit/EditForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiInstnace, endpoints } from "@/utils/domain";
import { useQuery } from "@tanstack/react-query";

export default function EditToDoPage({
  params,
}: {
  params: { todoId: string };
}) {
  const { isLoading, data } = useQuery({
    queryKey: ["to-dos", "detail", params.todoId],
    queryFn: () =>
      apiInstnace.get(`${endpoints.notes.detail}/${params.todoId}`),
  });

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[38em]">
        <DialogHeader>
          <DialogTitle>Edit To Do Form</DialogTitle>
        </DialogHeader>
        {isLoading ? null : <EditForm note={data?.data?.data} />}
      </DialogContent>
    </Dialog>
  );
}
