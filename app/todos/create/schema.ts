import { z } from "zod";

export const createToDoSchema = z.object({
  name: z.string({ message: "Please Fill name" }),
  status: z.enum(["to-do", "doing", "done"], {
    required_error: "Please choose current status",
    invalid_type_error: "Invalid Status!",
  }),
});

export type createToDoSchemaType = z.infer<typeof createToDoSchema>;
