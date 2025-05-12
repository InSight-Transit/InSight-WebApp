"use client";
import Link from "next/link";
import NavHeader from "../../header";
import ButtonLinks from "@/app/components/ButtonLinks";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/app/components/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Welcome() {
  const { t } = useTranslation("common");
  const { user } = useAuth(); // Get the authenticated user
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect to user profile if logged in
      router.push("/login/userprofile");
    }
  }, [user, router]);

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
          <Link className="w-1/2 h-[11vw]" href={`/home/login/tap`}>
            <button className="border-none text-[4.0vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              {t("tapCard")}
            </button>
          </Link>
          <Link className="w-1/2 h-[11vw]" href={`/home/login/face`}>
            <button className="border-none text-[4.0vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              {t("scanFace")}
            </button>
          </Link>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12">
        <Link className="w-full h-full" href={`/home/login/registerface/`}>
          <button className="border-none text-[5vw] w-full h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            Admin Login
          </button>
          </Link>
        </div>
        <ButtonLinks
        backHref="/home"
        />
      </div>
    </div>
  );
}