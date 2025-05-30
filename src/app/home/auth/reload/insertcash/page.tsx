/*
  insertcash page
  Sample page for inserting cash or coins.
*/

"use client";
import authWrapper from "@/app/components/authWrapper";
import NavHeader from "@/app/header";
import ButtonLinks from "@/app/components/ButtonLinks";

function Welcome() {
  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Please insert the cash / coins</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center">
          <div className="bg-sky-700 p-6 rounded-lg">
          <img src="../../../insertcashicon.png" alt="Insert Cash Icon" className="w-43 h-43" />
          </div>
        </div>
        <ButtonLinks/>
      </div>
    </div>
  );
}

export default authWrapper(Welcome);