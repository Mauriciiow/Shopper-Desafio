import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("signIn.errors.email"),
  password: z.string().min(8, "signIn.errors.password"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
