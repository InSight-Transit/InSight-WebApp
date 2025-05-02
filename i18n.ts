import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "./public/locales/en/common.json";
import es from "./public/locales/es/common.json";
import zh from "./public/locales/zh/common.json";
import vi from "./public/locales/vi/common.json";
import tl from "./public/locales/tl/common.json";

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    es: { common: es },
    zh: { common: zh },
    vi: { common: vi },
    tl: { common: tl },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  ns: ["common"], // Namespace used in translation files
  defaultNS: "common",
});

export default i18n;