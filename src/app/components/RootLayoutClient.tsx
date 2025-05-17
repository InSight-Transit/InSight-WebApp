/*
  RootLayoutClient component
  This component wraps the entire application with the necessary contexts.
  Such as AuthProvider, BalanceProvider, and LanguageProvider.
  This is sent to the layout.tsx file to be used in the app.
*/

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
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
  }, []);

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