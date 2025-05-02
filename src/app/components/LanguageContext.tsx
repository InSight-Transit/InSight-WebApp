"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import i18n from "i18next";

type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage); // Set the language in i18n
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang); // Update the language in i18n
    localStorage.setItem("language", lang); // Save the language to localStorage
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  console.log("LanguageContext:", context); // Debugging log
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}