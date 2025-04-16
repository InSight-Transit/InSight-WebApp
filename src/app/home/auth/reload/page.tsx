"use client";
import Link from "next/link";
import NavHeader from "../../../header";
import authWrapper from "@/app/components/authWrapper";
import ButtonLinks from "@/app/components/ButtonLinks";

// encapsulated by authWrapper
function Home() {

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Choose an option to reload</h2>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <Link className="w-full h-[11vw]" href={`/home/auth/reload/insertcash`}>
            <button className="border-none text-[5vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              Cash / Coin
            </button>
          </Link>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[5vw] w-full h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            Card / NFC
          </button>
        </div>
        <ButtonLinks/>
        
      </div>
    </div>
  );
}

export default authWrapper(Home);