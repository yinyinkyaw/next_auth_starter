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
import { signInSchema } from "../../app/(authentication)/signin/schema";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
type SignInFormProps = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInFormProps>({
    resolver: zodResolver(signInSchema),
    reValidateMode: "onChange",
  });

  const onSubmitLogin: SubmitHandler<SignInFormProps> = async (data) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (user) router.push("/todos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 grid grid-flow-row"
        onSubmit={form.handleSubmit(onSubmitLogin)}
      >
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
        <Button type="submit">
          {form.formState.isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
