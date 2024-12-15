"use client";

import { createToDoSchema } from "@/app/todos/create/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { apiInstnace, endpoints } from "@/utils/domain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateToDoProps = {
  name: string;
  status: "to-do" | "doing" | "done";
};

export default function CreateToDoForm() {
  const router = useRouter();
  const form = useForm<CreateToDoProps>({
    resolver: zodResolver(createToDoSchema),
    reValidateMode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: (newToDo: CreateToDoProps) => {
      return apiInstnace.post(`${endpoints.notes.create}`, newToDo);
    },
  });

  const onCreate: SubmitHandler<CreateToDoProps> = async (formData) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success("New To Do is added!");
        router.back();
      },
    });
  };
  return (
    <Form {...form}>
      <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onCreate)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input {...field} defaultValue={field.value} />
              </FormControl>
              <FormMessage />
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
                <SelectTrigger>
                  <SelectValue placeholder="Choose Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="to-do">To Do</SelectItem>
                    <SelectItem value="doing">Doing</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {form.formState.isSubmitting ? (
            <Fragment>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading...</span>
            </Fragment>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
}
