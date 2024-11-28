import { SignUpSchema } from "@/schemas/sign-up-schema";
import { useMutation } from "@tanstack/react-query";
import { signUpRepository } from "@/repository/sign-up-repository";

export function useSignUp() {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: SignUpSchema) => signUpRepository.signUp(data),
  });
}
