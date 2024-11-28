import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { englishDictionary, portugueseDictionary } from "./dictionary";

const resources = {
  en: {
    translation: englishDictionary,
  },
  pt: {
    translation: portugueseDictionary,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
