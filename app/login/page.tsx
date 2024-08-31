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
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

type LoginFormProps = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const form = useForm<LoginFormProps>();

  return (
    <article className="max-w-md mx-auto w-full bg-slate-200 p-6 rounded-lg">
      <h2 className="text-xl text-center my-2">Login</h2>
      <Form {...form}>
        <form className="grid grid-flow-row gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </article>
  );
}
