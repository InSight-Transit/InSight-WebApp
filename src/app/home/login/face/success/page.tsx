"use client";
import { useEffect, useRef, useState } from "react";
import ButtonLinks from "@/app/components/ButtonLinks";
import NavHeader from "@/app/header";
import { useSearchParams } from "next/navigation";

export default function Welcome() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader />
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Successfully logged in as user {accountId}!</h2>
      </div>
    </div>
  );
}
