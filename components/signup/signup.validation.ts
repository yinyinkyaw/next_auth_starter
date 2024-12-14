import { z } from "zod";

export const SignupSchema = z.object({
  fullname: z
    .string({ message: "full name field is required" })
    .trim()
    .min(1, { message: "Please enter full name" }),
  email: z
    .string({ message: "email field is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ message: "password field is required" })
    .trim()
    .min(1, { message: "Please enter password" }),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
