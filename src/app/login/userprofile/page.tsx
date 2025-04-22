"use client";

import NavHeader from "../../header";
import ButtonLinks from "@/app/components/ButtonLinks";
import { useAuth } from "@/app/components/authContext";
import { useBalance } from "@/app/components/balanceContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../../firebaseConfig";

export default function UserProfile() {
  const { user, logout, loading } = useAuth();
  const { balance } = useBalance();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect if not logged in
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const db = getFirestore(app);
        const userDoc = doc(db, "users", user.uid); // Assuming "users" is your Firestore collection
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
        } else {
          console.error("No such document!");
        }
      }
    };

    fetchUserData();
  }, [user]);

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
          <div className="text-2xl font-semibold">{firstName} {lastName}</div>
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
