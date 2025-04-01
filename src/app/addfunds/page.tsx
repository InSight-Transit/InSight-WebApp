"use client";

import { useState } from "react";
import NavHeader from "../header";

export default function Home() {
  const [amount, setAmount] = useState<number | "">(""); // Default: $10
  const [loading, setLoading] = useState(false);

  const predefinedAmounts = [5, 10, 20, 50];

  const handlePayment = async () => {
    if (!amount || amount < 1) {
      alert("Please enter a valid amount (minimum $1)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
      });

      const data = await response.json();
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
      </div>
    </div>
  );
}
