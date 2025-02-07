
import NavHeader from "./header";

export default function Home() {
  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-7xl font-bold p-14">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-3xl font-bold pb-8">Choose Language</h2>
      </div>
      <div className="pb-10 flex flex-1 justify-center items-center"> 
        <button className="text-4xl w-64 h-24 outline-none bg-white text-black font-extrabold text-xl px-6 py-2 rounded-lg border-4 border-blue-800">
          English
        </button>
        <button className="text-4xl w-64 h-24 outline-none bg-white text-black font-extrabold text-xl px-6 py-2 rounded-lg border-4 border-blue-800">
          Español
        </button>
      </div>
      <div className="pb-10 flex flex-1 justify-center items-center"> 
        <button className="text-4xl w-64 h-24 outline-none bg-white text-black font-extrabold text-xl px-6 py-2 rounded-lg border-4 border-blue-800">
          中文
        </button>
        <button className="text-4xl w-64 h-24 outline-none bg-white text-black font-extrabold text-xl px-6 py-2 rounded-lg border-4 border-blue-800">
          tiếng việt
        </button>
      </div>
      <div className="pb-10 flex flex-1 justify-center items-center"> 
        <button className="text-4xl w-64 h-24 outline-none bg-white text-black font-extrabold text-xl px-6 py-2 rounded-lg border-4 border-blue-800">
          Tagalog
        </button>
      </div>
    </div>
  );
}
