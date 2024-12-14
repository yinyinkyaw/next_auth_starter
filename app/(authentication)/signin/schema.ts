import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Please fill valid email" }),
  password: z.string().min(5, { message: "Please fill at least 5 characters" }),
});
