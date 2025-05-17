/*
  userprofile page
  User management page that dispalys user information.
  Allows the user to add funds, view transaction history, update face, and deactivate the account.
*/

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
import authWrapper from "@/app/components/authWrapper";

function UserProfile() {
  const { t } = useTranslation("common");
  const { user, loading } = useAuth();
  const { balance } = useBalance();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const db = getFirestore(app);
        const userDoc = doc(db, "users", user.uid);
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

        await deleteDoc(userRef);
        console.log("Firestore user deleted");

        const auth = getAuth(app);
        await user.delete();
        console.log("User deleted from Firebase Authentication");

        await signOut(auth);
        console.log("User signed out");

        router.push("/");
      } catch (error) {
        console.error("Error during deactivation:", error);
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

        <div className="bg-white text-black rounded-lg shadow p-6 w-full max-w-md space-y-4 text-center">
          <div className="text-2xl font-semibold">{firstName} {lastName}</div>
          <div className="text-md">{t("accountCard")}{user.uid}</div>
          <div className="text-md">{t("balance")}${balance.toFixed(2)}</div>
        </div>

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
      <Link href="/login/userprofile/updateFace" passHref>
        <button className="w-full bg-white text-black font-semibold py-4 rounded-md shadow">
          {t("updateFace")}
        </button>
      </Link>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-white text-black font-semibold py-4 rounded-md shadow"
          >
           {t("deactivate")}

        </button>
      </div>

      <ButtonLinks backHref="/home" />

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

export default authWrapper(UserProfile);