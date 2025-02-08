"use client"; // Ensure it's a Client Component

import { useState } from "react";
import { signUp } from "../../../../auth";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await signUp(email, password);
    if (user) {
      alert("Sign-up successful!");
    } else {
      console.error("Sign-up failed");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl">Sign Up</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-2">
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
