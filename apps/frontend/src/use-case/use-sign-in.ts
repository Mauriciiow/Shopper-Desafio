import { useAuth } from "@/hooks/use-auth";
import { signInRepository } from "@/repository/sign-in-repository";
import { SignInSchema } from "@/schemas/sign-in-schema";
import { useMutation } from "@tanstack/react-query";

interface SignResponse {
  id: string;
  email: string;
  access_token: string;
}

export function useSignIn() {
  const { setAuth } = useAuth();

  async function signIn(data: SignInSchema) {
    const response = await signInRepository.signIn(data);

    return response.data;
  }

  return useMutation<SignResponse, Error, SignInSchema>({
    mutationKey: ["signIn"],
    mutationFn: signIn,
    onSuccess: (data) => {
      setAuth(data.access_token, data.id);
    },
  });
}
