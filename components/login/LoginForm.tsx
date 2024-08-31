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
import { Resolver, SubmitHandler, useForm } from "react-hook-form";

type LoginFormProps = {
  username: string;
  password: string;
};

const resolver: Resolver<LoginFormProps> = async (values) => {
  return {
    values: values.username && values.password ? values : {},
    errors: !values.username
      ? {
          username: {
            type: "required",
            message: "Please Fill Username",
          },
        }
      : !values.password
      ? {
          password: {
            type: "required",
            message: "Please Fill Password",
          },
        }
      : {},
  };
};
export default function LoginForm() {
  const form = useForm<LoginFormProps>({
    resolver,
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </article>
  );
}
