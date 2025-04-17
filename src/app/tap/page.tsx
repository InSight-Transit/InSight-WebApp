import NavHeader from "@/app/header";
import ButtonLinks from "@/app/components/ButtonLinks";

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
        <h1 className="text-white text-5xl font-bold mb-6">InSight</h1>
        <h2 className="text-white text-xl font-semibold mb-8">Please insert or tap your credit card or phone payment</h2>
        <div className="flex flex-col items-center">
          <div className="bg-sky-700 p-6 rounded-lg">
          <img src="./Payfareicon.png" alt="Tap Card Icon" className="w-43 h-43" />
          </div>
        </div>
        <ButtonLinks/>
      </div>
    </div>
  );
}