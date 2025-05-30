/*
  header.tsx
  Header component for the application that includes title, logout, and clock.
*/

"use client";
import { useTranslation } from "react-i18next";
import DigitalClock from "./clock";
import { useAuth } from "./components/authContext";


export default function NavHeader({hideLogout}: {hideLogout?: boolean}) {
  const { t } = useTranslation("common");
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center h-[8vw] bg-blue-900 px-4">
      <h1 className="text-white text-[5vw] font-bold">Embarcadero</h1>
      {!hideLogout && user && (
        <button onClick={logout} className="text-white text-lg">{t("logout")}</button>
      )}
      <DigitalClock/>
    </div>
  );
}
