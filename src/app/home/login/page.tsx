import Link from "next/link";
import NavHeader from "../../header";


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
      <div className="flex flex-col items-center justify-center">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            Tap Card
          </button>
          <button className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            Scan Face
          </button>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[5vw] w-full h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            Register your face
          </button>
        </div>
        <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
        <Link className="w-full h-[6vw]" href={`/home/`}>
            <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              Back
            </button>
          </Link>
          <Link className="w-full h-[6vw]" href={`/`}>
            <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              Exit
            </button>
          </Link>
          <Link className="invisible w-full h-[6vw]" href={`/`}>
            <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              Agree
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}