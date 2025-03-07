import Link from "next/link";
import NavHeader from "../../../header";

export default function Welcome() {
  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Choose an option</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center">
         <div className="bg-sky-700 p-6 rounded-lg">
          <img src="../../scanfaceicon.png" alt="Scan Face Icon" className="w-43 h-43" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
         <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
         <Link className="w-full h-full" href={`/home/login/`}>
             <button className="border-none text-[3vw] w-[12vw] h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
              Back
             </button>
           </Link>
           <Link className="w-full h-full" href={`/`}>
             <button className="border-none text-[3vw] w-[12vw] h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
              Exit
             </button>
           </Link>
         </div>
        </div>
      </div>
    </div>
  );
}