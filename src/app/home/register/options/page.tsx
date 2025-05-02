"use client";
import NavHeader from "@/app/header";
import ButtonLinks from "@/app/components/ButtonLinks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../../../../../firebaseConfig"; // Ensure you import Firebase
import { signOut } from "firebase/auth"; // Ensure you import Firebase
import { useTranslation } from "react-i18next";

export default function OptionsPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/home/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader hideLogout/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("chooseOption")}</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[4.0vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
            {t("purchaseCard")}
          </button>
          <Link className="w-full h-full" href={`/home/register/options/registerface/`}>
            <button className="border-none text-[4.0vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              {t("registerFace")}
            </button>
          </Link>
        </div>

        <ButtonLinks />

        {/* TEMP Back to Login Button */}
        <button onClick = {handleLogout} className="mt-[6vw] w-6/12 border-none text-[4.0vw] w-1/2 h-[9vw] outline-none bg-white text-black font-semibold rounded-lg">
          Back to Login
        </button>
      </div>
    </div>
  );
}
