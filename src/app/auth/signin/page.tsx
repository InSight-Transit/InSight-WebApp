"use client"; // Ensure it's a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter to handle navigation
import { signIn } from "../../../../auth"; // Import the signIn function

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
    <div className="flex flex-col items-center">
      <h2 className="text-xl">Sign In</h2>
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
  );
}
