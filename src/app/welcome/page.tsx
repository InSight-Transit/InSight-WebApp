import NavHeader from "../header";


export default function Welcome() {
  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-7xl font-bold p-14">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-3xl font-bold pb-8">Choose an option</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-10 flex flex-1 justify-center items-center gap-12 w-6/12"> 
          <button className="border-none text-4xl w-1/2 h-24 outline-none bg-white text-black font-semibold text-4xl px-6 py-2 rounded-lg border-4 border-blue-800">
            Login
          </button>
          <button className="border-none text-4xl w-1/2 h-24 outline-none bg-white text-black font-semibold text-4xl px-6 py-2 rounded-lg border-4 border-blue-800">
            Register
          </button>
        </div>
        <div className="pb-10 flex flex-1 justify-center items-center gap-16 w-6/12"> 
          <button className="border-none text-6xl w-full h-24 outline-none bg-white text-black font-semibold text-xl px-4 py-2 rounded-lg border-4 border-blue-800">
            Route Information
          </button>
        </div>
        <div className="pb-10 flex flex-1 justify-center items-center gap-16 w-6/12"> 
          <button className="border-none text-6xl w-full h-24 outline-none bg-white text-black font-semibold text-xl px-4 py-2 rounded-lg border-4 border-blue-800">
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
}
