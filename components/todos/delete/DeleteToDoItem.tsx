import ConfirmationDialog from "@/components/common/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TrashIcon from "@/public/icons/trash.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiInstnace, endpoints } from "@/utils/domain";

interface DeleteToDoItemProps {
  todoId: number;
}

export default function DeleteToDoItem({ todoId }: DeleteToDoItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const queryClient = useQueryClient();

  const deleteNote = useMutation({
    mutationFn: (id: number) =>
      apiInstnace.delete(`${endpoints.notes.delete}/${id}`),
    onSuccess: () => {
      setShowConfirm(false);
      return queryClient.invalidateQueries({
        queryKey: ["to-dos"],
      });
    },
  });

  const handleDelete = () => {
    deleteNote.mutate(todoId);
  };

  return (
    <>
      <Button
        className="gap-x-2 text-destructive bg-secondary"
        onClick={() => setShowConfirm(true)}
      >
        <TrashIcon /> Delete
      </Button>
      <ConfirmationDialog
        isOpen={showConfirm}
        onContinue={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
