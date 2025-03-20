"use client";
import NavHeader from "@/app/header";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../../../firebaseConfig"; // Import Firebase auth and db
import { addDoc, collection } from "firebase/firestore";
import Payfareicon from "../../public/scanfaceicon.png";


export default function Welcome() {
  // Temporary function to simulate face data uploaded to firebaes
  // Later on, change to actual facial registration
  const router = useRouter();
  const [user, setUser] = useState<any>(auth.currentUser); // User state to track the signed-in user
  const [faceData, setFaceData] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/auth/signin"); // Redirect to signin if not logged in
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  const addUserFaceData = async (faceData: string): Promise<void> => {
    const user = auth.currentUser;

    // No authentication currently implemented.
    if (!user) {
      alert("You must be signed in to add data!");
      console.error("No authenticated user found!");
      return;
    }
    console.log("Adding face data for user:", user.uid);

    try {
      await addDoc(collection(db, "facialData"), {
        userId: user.uid,
        faceData,
        createdAt: new Date(),
      });
      alert("User face data added successfully!");
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Please remove facial coverings</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center">
        <h3 className="text-white text-[2vw] pb-[0.4vw]">Step 1</h3>
        <div className="bg-sky-700 pb-6 rounded-lg">
        <button
                onClick={() => {
                  //setFaceData("sample-face-data"); // Set predefined face data
                  addUserFaceData("sample-face-data"); // Call function to add face data
                }}
              >

          <img src="../../scanfaceicon.png" alt="Scan Face Icon" className="w-43 h-43" />
          </button>
          </div>
        </div>

        <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
            Back
          </button>
          <button className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
            Exit
          </button>
          <button className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}