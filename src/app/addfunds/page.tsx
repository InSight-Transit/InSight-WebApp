"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavHeader from "../header";
import ButtonLinks from "@/app/components/ButtonLinks";
import { useBalance } from "../components/balanceContext"
import { useAuth } from "../components/authContext";  // Import AuthContext
//import { getFirestore } from "firebase/firestore";
import authWrapper from "@/app/components/authWrapper"

//const db = getFirestore();

// encapsulated by authWrapper
function Home() {
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const { balance, refreshBalance } = useBalance();
  const {user} = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const canceled = params.get("canceled");

    if (searchParams.get("success") === "true") {
      setMessage("Payment Successful! Your balance has been updated.");
      refreshBalance();
    } else if (searchParams.get("canceled") === "true") {
      setMessage("Payment Canceled. You can try again.");
    }

    if (success || canceled) {
      setTimeout(() => {
        router.replace("/addfunds", {scroll: false});
        setMessage(null);
      }, 3000);
    }
  }, [searchParams, router, refreshBalance]);

  const handlePayment = async () => {
    if (!amount || amount < 1) {
      alert("Please enter a valid amount (minimum $1)");
      return;
    }

    if (!user) {
      alert("You must be signed in to add funds.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount * 100,
          userId: user.uid,
        }),
      });
      const text = await response.text();
      console.log("API Response:", text);
      const data = JSON.parse(text);
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Error creating checkout session:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <h1>Balance: ${balance}</h1>
      {message && (
        <div className="flex justify-center items-center mt-5">
          <div className="bg-white text-black p-4 rounded-lg text-center shadow-lg">
            {message}
          </div>
        </div>
      )}
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Choose an amount to reload</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button onClick={() => setAmount(5)} className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            $5
          </button>
          <button onClick={() => setAmount(10)} className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            $10
          </button>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button onClick={() => setAmount(20)} className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            $20
          </button>
          <button onClick={() => setAmount(50)} className="border-none text-[4.0vw] w-1/2 h-[11vw] outline-none bg-white text-black font-semibold rounded-lg">
            $50
          </button>
        </div>
        <div className="pb-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <div className="relative w-1/2">
            <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-[4.0vw] text-black font-semibold">
              $
            </span>
            <input
              type="number"
              placeholder="5"
              className="border-2 border-black text-[4.0vw] w-full h-[11vw] outline-none bg-white text-black font-semibold rounded-lg pl-[3.5vw] text-center"
              value={amount === "" ? "" : amount}
              onChange={(e) => setAmount(Number(e.target.value) || "")}
            />
          </div>
        </div>
        <div className="pt-[4vw] flex flex-1 justify-center items-center gap-[5vw] w-6/12"> 
          <button className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
            Back
          </button>
          <button className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg">
            Exit
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="border-none text-[3vw] w-full h-[6vw] outline-none bg-white text-black font-semibold rounded-lg"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
        <ButtonLinks/>
      </div>
    </div>
  );
}

export default authWrapper(Home);