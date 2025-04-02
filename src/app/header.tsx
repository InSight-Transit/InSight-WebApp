"use client";
import DigitalClock from "./clock";
import { useAuth } from "./components/authContext";


function NavHeader() {
  // Added functionality for logout
  // TODO: Update 'logout' to match theme
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center h-[8vw] bg-blue-900 px-4">
      <h1 className="text-white text-[5vw] font-bold">Embarcadero</h1>
      {user && (
        <button onClick={logout} className="text-white text-lg">Logout</button>
      )}
      <DigitalClock/>      
    </div>
  );
}
export default NavHeader;