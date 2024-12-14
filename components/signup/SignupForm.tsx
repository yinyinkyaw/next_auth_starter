"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignupSchema, SignupSchemaType } from "./signup.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseApp } from "@/services/firebase";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export default function SignupForm() {
  const router = useRouter();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });

  const onSignup: SubmitHandler<SignupSchemaType> = async (formData) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (user) router.push("/todos");

      console.log("user::", user);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 grid grid-flow-row"
        onSubmit={form.handleSubmit(onSignup)}
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="full-name">Full Name</FormLabel>
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {form.formState.isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
