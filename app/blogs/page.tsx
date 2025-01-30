import AdminHeaderBar from "@/components/common/admin/admin-header-bar";
import TextEditor from "@/components/common/text-editor";
import AdminLayout from "@/Layout/AdminLayout";

export default function BlogsPage() {
  return (
    <AdminLayout>
      <AdminHeaderBar title="Blogs" />
      <TextEditor />
    </AdminLayout>
  );
}
