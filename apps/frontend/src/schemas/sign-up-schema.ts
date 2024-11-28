import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "signUp.errors.name"),
  email: z.string().email("signUp.errors.email"),
  password: z.string().min(8, "signUp.errors.password"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
