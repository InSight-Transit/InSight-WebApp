"use client";
import NavHeader from "./header";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/components/LanguageContext";

export default function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { changeLanguage } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang); // Change the language
    router.push("/home"); // Redirect to /home
  };

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader />
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("chooseLanguage")}</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12">
          <button
            onClick={() => handleLanguageChange("en")}
            className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
          >
            {t("english")}
          </button>
          <button
            onClick={() => handleLanguageChange("es")}
            className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
          >
            {t("spanish")}
          </button>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12">
          <button
            onClick={() => handleLanguageChange("zh")}
            className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
          >
            {t("chinese")}
          </button>
          <button
            onClick={() => handleLanguageChange("vi")}
            className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
          >
            {t("vietnamese")}
          </button>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12">
          <button
            onClick={() => handleLanguageChange("tl")}
            className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
          >
            {t("tagalog")}
          </button>
        </div>
      </div>
    </div>
  );
}
