import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ message: "Please fill username" }),
  password: z.string().min(5, { message: "Please fill at least 5 characters" }),
});
