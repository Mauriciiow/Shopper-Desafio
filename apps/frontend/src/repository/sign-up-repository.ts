import { api } from "@/api";

import { SignUpSchema } from "@/schemas/sign-up-schema";

function signUp({ name, email, password }: SignUpSchema) {
  return api.post("/users/register", { name, email, password });
}

export const signUpRepository = {
  signUp,
};
