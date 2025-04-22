"use client";

import Link from "next/link";
import NavHeader from "../../header";
import ButtonLinks from "@/app/components/ButtonLinks";
import { useAuth } from "@/app/components/authContext";
import { useBalance } from "@/app/components/balanceContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserProfile() {
  const { user, logout, loading } = useAuth();
  const { balance } = useBalance();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="text-white">Loading...</p>;
  }
  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader />

      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Account Info</h2>
      </div>

      <div className="flex flex-col items-center justify-center">

        {/* Profile Card */}
        <div className="bg-white text-black rounded-lg shadow p-6 w-full max-w-md space-y-4 text-center">
           {/* User name <div className="text-2xl font-semibold">{user.firstName}</div>*/}
          <div className="text-md">Card ID: {user.uid}</div>
          <div className="text-md">Balance: ${balance.toFixed(2)}</div>
        </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-md">
        <button className="bg-white text-black font-semibold py-4 rounded-md shadow">Add Funds
        </button>
        <button className="bg-white text-black font-semibold py-4 rounded-md shadow">View Transactions</button>
        <button className="bg-white text-black font-semibold py-4 rounded-md shadow">Update Info</button>
        <button className="bg-white text-black font-semibold py-4 rounded-md shadow">Deactivate Card</button>
      </div>

        <ButtonLinks backHref="/home" />
      </div>
    </div>
  );
}
