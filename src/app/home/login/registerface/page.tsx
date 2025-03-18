"use client"; 
import NavHeader from "@/app/header";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Welcome() {
  const [step, setStep] = useState(1);
  const [time, setTime] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      router.back(); 
    } else {
      setStep(step - 1); 
    }
  };

  const handleExit = () => {
    router.push("/"); 
  };

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
        <button 
          onClick={handleBack} 
          className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
          Back
        </button>
        <button 
          onClick={handleExit} 
          className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
          Exit
        </button>
        <button 
          onClick={handleNext} 
          className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
          Next
        </button>
      </div>
      </div>
    </div>
  );
}