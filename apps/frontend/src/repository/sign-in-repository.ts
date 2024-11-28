import { api } from "@/api";
import { SignInSchema } from "@/schemas/sign-in-schema";

function signIn({ email, password }: SignInSchema) {
  return api.post("/auth/login", { email, password });
}

export const signInRepository = {
  signIn,
};
