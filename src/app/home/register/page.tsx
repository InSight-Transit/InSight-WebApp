/*
  register page
  Register page for creating a new account.
*/

"use client";

import { useState } from "react";
import { signUp } from "../../../../auth";
import Link from "next/link";
import NavHeader from "@/app/header";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation("common");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { firstName, lastName, phone };
    const user = await signUp(email, password, userData);
    if (user) {
      router.push("/home/register/terms");
    } else {
      console.error("Sign-up failed");
    }
  };

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("fields")}</h2>
      </div>
      <form onSubmit={handleSignUp} className="flex flex-col items-center justify-center w-full">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[3vw] w-10/12">
          <div className="w-6/12">
            <h3 className="text-white text-[2vw] pb-[0.2vw]">{t("firstName")}</h3>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
              required
            />
          </div>
          <div className="w-6/12">
            <h3 className="text-white text-[2vw] pb-[0.2vw]">{t("lastName")}</h3>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
              required
            />
          </div>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[3vw] w-10/12">
        <div className="w-6/12">
            <h3 className="text-white text-[2vw] pb-[0.2vw]">{t("email")}</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
              required
            />
          </div>
          <div className="w-6/12">
            <h3 className="text-white text-[2vw] pb-[0.2vw]">{t("phoneNumber")}</h3>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
              required
            />
          </div>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[3vw] w-10/12">
          <div className="w-6/12">
            <h3 className="text-white text-[2vw] pb-[0.2vw]">{t("password")}</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-none text-[4.0vw] w-11/12 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg"
              required
            />
          </div>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
        </div>
        <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 

        <Link className="w-full h-[6vw]" href={`/home/`}>
            <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              {t("back")}
            </button>
          </Link>
          <Link className="w-full h-[6vw]" href={`/`}>
            <button className="border-none text-[3vw] w-full h-full outline-none bg-white text-black font-semibold rounded-lg">
              {t("exit")}
            </button>
          </Link>
            <button type="submit" className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
              {t("confirm")}
            </button>
        </div>
      </form>
    </div>
  );
}