import DigitalClock from "./clock";

function NavHeader() {

  return (
    <div className="flex justify-between items-center h-[8vw] bg-blue-900 px-4">
      <h1 className="text-white text-[5vw] font-bold">Embarcadero</h1>
      <DigitalClock/>      
    </div>
  );
}
export default NavHeader;