"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../app/(authentication)/login/schema";
import Link from "next/link";

type LoginFormProps = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const form = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onChange",
  });

  const onSubmitLogin: SubmitHandler<LoginFormProps> = (data) => {
    console.log(data);
  };

  return (
    <article className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form
            className="space-y-6 grid grid-flow-row"
            onSubmit={form.handleSubmit(onSubmitLogin)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
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
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>
                    <div className="text-sm">
                      <button
                        type="button"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            href="/signup"
            className=" ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </article>
  );
}
