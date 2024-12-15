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
import { useRouter } from "next/navigation";

export default function EditToDoPage({
  params,
}: {
  params: { todoId: string };
}) {
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ["to-dos", "detail", params.todoId],
    queryFn: () =>
      apiInstnace.get(`${endpoints.notes.detail}/${params.todoId}`),
  });

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="sm:max-w-[38em]">
        <DialogHeader>
          <DialogTitle>Edit To Do Form</DialogTitle>
        </DialogHeader>
        {isLoading ? null : <EditForm note={data?.data?.data} />}
      </DialogContent>
    </Dialog>
  );
}
