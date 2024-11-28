import { useTranslation } from "react-i18next";
import { Input, Label, Button } from "@/components";
import { SignInSchema, signInSchema } from "@/schemas/sign-in-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTranslatedErrors } from "@/lib/i18n/get-errors";
import { useNavigate } from "@tanstack/react-router";
import { useSignIn } from "@/use-case/use-sign-in";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { showToast } from "@/helper/toast";
export default function SignInForm() {
  const { t } = useTranslation();
  const search = new URLSearchParams(window.location.search);
  const redirect = search.get("redirect") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const navigate = useNavigate();

  const translatedErrors = getTranslatedErrors(errors, t);
  const { mutate: signIn, isPending } = useSignIn();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      navigate({ to: redirect });
    }
  }, [authenticated, navigate, redirect]);

  const onSubmit = (data: SignInSchema) => {
    signIn(data, {
      onError() {
        showToast(t(`signIn.errors.invalidCredentials`), "error");
      },
    });
  };

  return (
    <form
      className="max-w-md w-full px-8 sm:px-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-7">
        <div>
          <h1 className="text-2xl font-bold text-green-tertiary">
            {t("signIn.title")}
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-green-tertiary">{t("signIn.email")}</Label>
          <Input
            hasError={!!translatedErrors.email}
            placeholder={t("signIn.placeholders.email")}
            {...register("email")}
          />
          {translatedErrors.email && (
            <p className="text-red-500 text-xs">{translatedErrors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-green-tertiary">{t("signIn.password")}</Label>
          <Input
            hasError={!!translatedErrors.password}
            placeholder={t("signIn.placeholders.password")}
            type="password"
            {...register("password")}
          />
          {translatedErrors.password && (
            <p className="text-red-500 text-xs">{translatedErrors.password}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full" type="submit" isLoading={isPending}>
            {t("signIn.button")}
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => navigate({ to: "/register" })}
            className="text-green-tertiary text-sm text-center underline"
          >
            {t("signIn.haveNoAccount")}
          </Button>
        </div>
      </div>
    </form>
  );
}
