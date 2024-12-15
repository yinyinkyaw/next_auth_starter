"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAuthStore } from "@/providers/AuthProvider";
import { Button } from "../ui/button";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

export function EditUserInfoForm({ onClose }: { onClose: () => void }) {
  const { user } = useAuthStore();
  const auth = getAuth();
  const form = useForm({
    defaultValues: {
      username: user?.displayName ?? "",
      email: user?.email ?? "",
      phone: user?.phoneNumber ?? "",
    },
  });

  const onUpdateUserInfo = async (data: any) => {
    console.log(data);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.username,
        });
        toast.success("Profile updated successfully");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-2"
        onSubmit={form.handleSubmit(onUpdateUserInfo)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-kanit text-sm font-medium">
                Username
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-kanit text-sm font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-start mt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
