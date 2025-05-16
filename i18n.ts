/*
  i18n.ts
  Translation setup and import translation files.
*/

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./public/locales/en/common.json";
import es from "./public/locales/es/common.json";
import zh from "./public/locales/zh/common.json";
import vi from "./public/locales/vi/common.json";
import tl from "./public/locales/tl/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    es: { common: es },
    zh: { common: zh },
    vi: { common: vi },
    tl: { common: tl },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  ns: ["common"],
  defaultNS: "common",
});

export default i18n;