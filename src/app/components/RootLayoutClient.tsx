"use client";

import { useState, useEffect } from "react";
import { AuthProvider } from "./authContext";
import { BalanceProvider } from "./balanceContext";
import { LanguageProvider } from "./LanguageContext";
import "../../../i18n";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [language, setLanguage] = useState("en"); // Default language is English

  // Load the saved language from localStorage (if available)
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
  }, []);

  // Save the selected language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <AuthProvider>
      <BalanceProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </BalanceProvider>
    </AuthProvider>
  );
}