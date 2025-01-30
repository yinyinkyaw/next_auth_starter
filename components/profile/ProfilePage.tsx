"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { EditUserInfoForm } from "@/components/profile/EditUserInfoForm";
import { useAuthStore } from "@/providers/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-kanit">Profile Information</CardTitle>
        <CardDescription>
          View and update your profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex gap-4 px-4">
          <Avatar>
            <AvatarImage src={user?.photoURL ?? ""} />
            <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <p className="font-kanit text-lg font-medium">
              {user?.displayName}
            </p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4 px-4 pb-8">
          <div className="flex justify-between items-center">
            <p className="font-kanit text-lg font-medium">Personal Details</p>
            <Button
              variant="outline"
              size="icon"
              title="Edit Profile"
              onClick={() => setOpenEdit(!openEdit)}
            >
              <PencilIcon className="w-4 h-4" />
            </Button>
          </div>

          {openEdit ? (
            <EditUserInfoForm onClose={() => setOpenEdit(false)} />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <p className="font-kanit text-sm font-medium">Username</p>
                <p className="text-sm text-muted-foreground">
                  {user?.displayName ?? "-"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-kanit text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
