
import NavHeader from "./header";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Choose Language</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
            <Link href={`/home/`} className="w-1/2 h-[11vw]">
              <button className="border-none text-[4.0vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
                English
              </button>
            </Link>
          <button className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            Español
          </button>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            中文
          </button>
          <button className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            tiếng việt
          </button>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            Tagalog
          </button>
        </div>
      </div>
    </div>
  );
}
