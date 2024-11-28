import { useTranslation } from "react-i18next";
import { Input, Label, Button } from "@/components";
import {
  TripRequestSchema,
  tripRequestSchema,
} from "@/schemas/trip-request-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTranslatedErrors } from "@/lib/i18n/get-errors";

export default function RequestTripForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (data: TripRequestSchema) => void;
  isPending?: boolean;
}) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripRequestSchema>({
    resolver: zodResolver(tripRequestSchema),
  });

  const translatedErrors = getTranslatedErrors(errors, t);

  return (
    <form
      className="max-w-md w-full  px-8 sm:px-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-7">
        <div>
          <h1 className="text-2xl font-bold text-green-tertiary">
            {t("estimativeForm.title")}
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-green-tertiary">
            {t("estimativeForm.originAddress")}
          </Label>
          <Input
            hasError={!!translatedErrors.originAddress}
            placeholder={t("estimativeForm.placeholders.originAddress")}
            {...register("originAddress")}
          />
          {translatedErrors.originAddress && (
            <p className="text-red-500 text-xs">
              {translatedErrors.originAddress}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-green-tertiary">
            {t("estimativeForm.destinationAddress")}
          </Label>
          <Input
            hasError={!!translatedErrors.destinationAddress}
            placeholder={t("estimativeForm.placeholders.destinationAddress")}
            {...register("destinationAddress")}
          />
          {translatedErrors.destinationAddress && (
            <p className="text-red-500 text-xs">
              {translatedErrors.destinationAddress}
            </p>
          )}
        </div>
        <Button className="w-full" type="submit" isLoading={isPending}>
          {t("estimativeForm.calculate")}
        </Button>
      </div>
    </form>
  );
}
