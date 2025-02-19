"use client";

import EditForm from "@/components/todos/edit/EditForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AdminLayout from "@/Layout/AdminLayout";
import { apiInstnace, endpoints } from "@/utils/domain";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function EditTodoPage({
  params,
}: {
  params: { todoId: string };
}) {
  const { isPending, error, data } = useQuery({
    queryKey: ["to-dos", "detail", params.todoId],
    queryFn: () =>
      apiInstnace.get(`${endpoints.notes.detail}/${params.todoId}`),
  });

  if (isPending) return <p>Fetching ...</p>;

  if (error) {
    toast.error(`${error.message}`, { position: "top-right" });
    return;
  }

  return (
    <AdminLayout>
      <section className="container mx-auto p-10">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/todos">To Dos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Edit To Do</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Card>
          <CardHeader>Edit To Do Form</CardHeader>
          <CardContent>
            <EditForm note={data?.data.data} />
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
}
