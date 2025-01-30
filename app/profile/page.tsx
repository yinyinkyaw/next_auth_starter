import AdminHeaderBar from "@/components/common/admin/admin-header-bar";
import AdminLayout from "@/Layout/AdminLayout";
import { Metadata } from "next";
import ProfilePage from "@/components/profile/ProfilePage";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
};

export default function UserProfilePage() {
  return (
    <AdminLayout>
      <section className="container mx-auto max-w-screen-lg">
        <AdminHeaderBar title="Settings" />
        <p className="text-muted-foreground text-sm mb-4">
          Customize your profile, personal details, and security settings.
        </p>
        <ProfilePage />
      </section>
    </AdminLayout>
  );
}
