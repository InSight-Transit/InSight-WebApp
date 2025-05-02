"use client";
// import { useEffect, useRef, useState } from "react";
// import ButtonLinks from "@/app/components/ButtonLinks";
import { Suspense } from "react";
import NavHeader from "@/app/header";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

function SuccessPage() {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader />
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("successLogin")} {accountId}!</h2>
      </div>
    </div>
  );
}

export default function Welcome() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessPage />
    </Suspense>
  );
}