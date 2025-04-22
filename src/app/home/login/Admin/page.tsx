"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../../../../auth";

// TEMP Login page to see if authentication is working
// need to link to MongoDB and scan face instead for actual login
// Replace with homepage(?)
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn(email, password);
    if (result) {
      router.push("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email" className="border p-2 mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border p-2 mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="mt-4 bg-blue-500 text-white p-2">Login</button>
    </div>
  );
}
