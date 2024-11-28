import { useTranslation } from "react-i18next";
import { Input, Label, Button } from "@/components";
import { SignUpSchema, signUpSchema } from "@/schemas/sign-up-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTranslatedErrors } from "@/lib/i18n/get-errors";
import { useNavigate } from "@tanstack/react-router";
import { useSignUp } from "@/use-case/use-sign-up";
import { showToast } from "@/helper/toast";

export default function SignUpForm() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const { mutate: signUp, isPending } = useSignUp();

  const translatedErrors = getTranslatedErrors(errors, t);

  const onSubmit = (data: SignUpSchema) => {
    signUp(data, {
      onSuccess: () => {
        navigate({ to: "/login" });
      },
      onError() {
        showToast(t(`signUp.errors.userAlreadyExists`), "error");
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
            {t("signUp.title")}
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-green-tertiary">{t("signUp.name")}</Label>
          <Input
            hasError={!!translatedErrors.name}
            placeholder={t("signUp.placeholders.name")}
            {...register("name")}
          />
          {translatedErrors.name && (
            <p className="text-red-500 text-xs">{translatedErrors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-green-tertiary">{t("signUp.email")}</Label>
          <Input
            hasError={!!translatedErrors.email}
            placeholder={t("signUp.placeholders.email")}
            {...register("email")}
          />
          {translatedErrors.email && (
            <p className="text-red-500 text-xs">{translatedErrors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-green-tertiary">{t("signUp.password")}</Label>
          <Input
            hasError={!!translatedErrors.password}
            placeholder={t("signUp.placeholders.password")}
            type="password"
            {...register("password")}
          />
          {translatedErrors.password && (
            <p className="text-red-500 text-xs">{translatedErrors.password}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full" type="submit" isLoading={isPending}>
            {t("signUp.button")}
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => navigate({ to: "/login" })}
            className="text-green-tertiary text-sm text-center underline"
          >
            {t("signUp.haveAnAccount")}
          </Button>
        </div>
      </div>
    </form>
  );
}
