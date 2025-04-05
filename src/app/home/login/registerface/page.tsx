"use client"; 
import NavHeader from "@/app/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonLinks from "@/app/components/ButtonLinks";


export default function Welcome() {
  const [step, setStep] = useState(1);
  // const [time, setTime] = useState("");

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Please remove facial coverings</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center">
        <h3 className="text-white text-[2vw] pb-[1vw]">Step {step}</h3>
        <div className="bg-sky-700 pb-6 rounded-lg">
          <img src="../../scanfaceicon.png" alt="Scan Face Icon" className="w-43 h-43" />
        </div>
      </div>

      <div className="pt-6 flex justify-center items-center gap-6 w-8/12">
      <ButtonLinks
      agreeHref="@src\app\home\register\terms\page.tsx"
      />
      </div>
      </div>
    </div>
  );
}