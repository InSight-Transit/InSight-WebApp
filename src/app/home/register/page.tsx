
import Link from "next/link";
import NavHeader from "../../header";
import ButtonLinks from "@/app/components/ButtonLinks";

export default function registration() {
  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Please fill all the fields</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[3vw] w-10/12"> 
          <div className="w-6/12"> 
            <h3 className="text-white text-[2vw] pb-[0.2vw]">First Name</h3>
            <input className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"></input>
          </div>
          <div className="w-6/12"> 
            <h3 className="text-white text-[2vw] pb-[0.2vw]">Last Name</h3>
            <input className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"></input>
          </div>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[3vw] w-10/12"> 
          <div className="w-6/12"> 
            <h3 className="text-white text-[2vw] pb-[0.2vw]">E-mail</h3>
            <input className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"></input>
          </div>
          <div className="w-6/12"> 
            <h3 className="text-white text-[2vw] pb-[0.2vw]">Password</h3>
            <input type="password" className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"></input>
          </div>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
        </div>
        <ButtonLinks
        agreeHref="/home/register/terms"
        agreeLabel="Next"
        />
      </div>
    </div>
  );
}
