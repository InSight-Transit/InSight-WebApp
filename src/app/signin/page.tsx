"use client"; // Ensure it's a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter to handle navigation
import { signIn } from "../../../auth"; // Import the signIn function
import NavHeader from "@/app/header";

<NavHeader/>

// Sign in kept from Arjay branch w/ Signup/Register; probably not to be used
// Feel free to delete or change
export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Initialize the router

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await signIn(email, password);
    if (user) {
      alert("Sign-in successful!");
      router.push("/dashboard"); // Redirect to the dashboard after successful sign-in
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-7xl font-bold p-14">Sign In</h1>
      </div>
      <div className="pb-10 flex flex-1 justify-center items-center"> 
        <form onSubmit={handleSignIn} className="flex flex-col gap-2">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border p-2"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded">Sign In</button>
        </form>
        </div>
    </div>
  );
}
