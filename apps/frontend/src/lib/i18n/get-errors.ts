import { FieldErrors, FieldValues } from "react-hook-form";
import { TFunction } from "i18next";

export const getTranslatedErrors = <T extends FieldValues>(
  errors: FieldErrors<T>,
  t: TFunction
): Partial<Record<keyof T, string>> => {
  const translatedErrors: Partial<Record<keyof T, string>> = {};

  Object.keys(errors).forEach((key) => {
    const error = errors[key as keyof T];
    if (error?.message) {
      translatedErrors[key as keyof T] = t(error.message as string);
    }
  });

  return translatedErrors;
};
