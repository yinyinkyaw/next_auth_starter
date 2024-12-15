import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CreateToDoForm from "@/components/todos/create/CreateToDoForm";

export default function CreateToDoPage() {
  return (
    <section className="container mx-auto p-10">
      <div className="mb-4">
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

      <Card>
        <CardHeader>Create To Do Form</CardHeader>
        <CardContent>
          <CreateToDoForm />
        </CardContent>
      </Card>
    </section>
  );
}
