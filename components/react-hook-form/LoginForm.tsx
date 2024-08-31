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
export default function LoginFormWithRHF() {
  const form = useForm<LoginFormProps>({ resolver });

  const onSubmitLogin: SubmitHandler<LoginFormProps> = (data) => {
    console.log(data);
  };

  return (
    <article className="max-w-md h-fit mx-auto w-full bg-slate-200 p-6 rounded-lg">
      <h2 className="text-xl text-center my-2">Login</h2>
      <Form {...form}>
        <form
          className="grid grid-flow-row gap-4"
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
    </article>
  );
}
