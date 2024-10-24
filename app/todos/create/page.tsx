"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { createToDoSchema } from "./schema";
import { apiInstnace, endpoints } from "@/utils/domain";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type CreateToDoProps = {
  name: string;
  status: "to-do" | "doing" | "done";
};

export default function CreateToDoPage() {
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
        router.push("/todos");
      },
    });
  };

  return (
    <section className="container mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">New To Do</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/todos">To Dos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Create To Do</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            {mutation.isPending ? "Loading ..." : "Create"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
