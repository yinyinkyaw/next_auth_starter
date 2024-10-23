"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Note } from "@/interfaces/notes.interface";
import { apiInstnace, endpoints } from "@/utils/domain";
import { todoStatus } from "@/utils/shareData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditFormProps {
  note?: Note;
}

export default function EditForm({ note }: EditFormProps) {
  const form = useForm({
    defaultValues: note,
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  const editNode = useMutation({
    mutationFn: (note: Partial<Note>) =>
      apiInstnace.put(endpoints.notes.update, note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["to-dos"],
      });
      toast.success("Update data successfully!");
      router.back();
    },
  });

  const onUpdate: SubmitHandler<Partial<Note>> = async (data) => {
    editNode.mutate(data, {
      onError: (err) => {
        console.log("error::", err);
      },
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onUpdate)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {todoStatus.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
