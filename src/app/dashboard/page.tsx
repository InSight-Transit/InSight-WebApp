"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig"; // Import the auth and db from firebaseConfig
import { addDoc, collection } from "firebase/firestore";

export default function Dashboard() {
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
    if (!user) {
        alert("You must be signed in to add data!");
        console.error("No authenticated user found!");
        return;
      }
    console.log("Current user: ", user);


    try {
        console.log("Adding face data for user: ", user.uid); // Log the UID
        console.log("Face data: ", faceData); // Log the face data being sent

        await addDoc(collection(db, "facialData"), {
            userId: user.uid,
            faceData,
            createdAt: new Date(),
      });
      alert("User face data added!");
    } catch (e) {
      console.error("Error adding document: ", e); // Log the error
    }
  };


  const handleAddFaceData = () => {
    if (faceData) {
      addUserFaceData(faceData); // Call the addUserFaceData function
    } else {
      alert("Please enter facial data.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <>
          <h1 className="text-3xl font-bold">Welcome {user.email}!</h1>
          <button
            onClick={() => auth.signOut()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Log Out
          </button>
          
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter facial data"
              value={faceData}
              onChange={(e) => setFaceData(e.target.value)}
              className="border p-2 mb-2"
            />
            <button
              onClick={handleAddFaceData}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Register Facial Data
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
