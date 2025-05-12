"use client";

import NavHeader from "../../header";
import ButtonLinks from "@/app/components/ButtonLinks";
import { useAuth } from "@/app/components/authContext";
import { useBalance } from "@/app/components/balanceContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { app } from "../../../../firebaseConfig";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getAuth, signOut } from "firebase/auth";

export default function UserProfile() {
  const { t } = useTranslation("common");
  const { user, loading } = useAuth();
  const { balance } = useBalance();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!loading && !user && !showConfirm) {
      router.push("/login");
    }
  }, [user, loading, showConfirm, router]);

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

    const handleDeactivate = async () => {
      if (!user) return;

      try {
        const db = getFirestore(app);
        const userRef = doc(db, "users", user.uid);

        // 1. Delete Firestore user doc
        await deleteDoc(userRef);
        console.log("Firestore user deleted");

        // 2. Delete user from Firebase Auth
        const auth = getAuth(app);
        await user.delete(); // Deletes the user from Firebase Authentication
        console.log("User deleted from Firebase Authentication");

        // 3. Sign the user out
        await signOut(auth);
        console.log("User signed out");

        // 4. Redirect AFTER sign out (not inside useEffect)
        router.push("/"); // Go to home page
      } catch (error) {
        console.error("Error during deactivation:", (error as any).message || error);
      }
    };

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
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("accountInfo")}</h2>
      </div>

      <div className="flex flex-col items-center justify-center">

        {/* Profile Card */}
        <div className="bg-white text-black rounded-lg shadow p-6 w-full max-w-md space-y-4 text-center">
          <div className="text-2xl font-semibold">{firstName} {lastName}</div>
          <div className="text-md">{t("accountCard")}{user.uid}</div>
          <div className="text-md">{t("balance")}${balance.toFixed(2)}</div>
        </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-md">
      <Link href="/addfunds" passHref>
       <button className="w-full bg-white text-black font-semibold py-4 rounded-md shadow">
       {t("addFunds")}
       </button>
      </Link>
      <Link href="/login/userprofile/viewTransaction" passHref>
        <button className="w-full bg-white text-black font-semibold py-4 rounded-md shadow">
          {t("viewHistory")}
      </button>
      </Link>
        <button className="bg-white text-black font-semibold py-4 rounded-md shadow">{t("updateInfo")}</button>
        <button 
          onClick={() => setShowConfirm(true)}
          className="bg-white text-black font-semibold py-4 rounded-md shadow"
          >
           {t("deactivate")}

        </button>
      </div>

      <ButtonLinks backHref="/home" />

      {/* Deactivation Confirmation Modal */}     
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-[80%]">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">This will permanently delete your account.</p>
            <div className="flex justify-around">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeactivate}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div> 
  </div>  
  );
}
