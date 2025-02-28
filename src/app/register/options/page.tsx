
import NavHeader from "../../header";

export default function registration() {
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
        <div className="py-[13vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
          Purchase Card
          </button>
          <button className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            Scan Face
          </button>
        </div>
        <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[2vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
            Back
          </button>
          <button className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
            Exit
          </button>
          <button className="border-none invisible text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
