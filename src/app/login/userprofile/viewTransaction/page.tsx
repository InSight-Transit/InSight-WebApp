/*
  viewTransaction page
  Retrieves transaction history from Stripe and displays it to user.
*/

"use client";

import { useTransactions } from "../../../components/useTransactions";
import NavHeader from "@/app/header";
import ButtonLinks from "@/app/components/ButtonLinks";

export default function TransactionHistory() {
  const transactions = useTransactions();


  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader />
      <div className="flex flex-col items-center justify-start pt-[4vw]">
        <h1 className="text-white text-[8vw] font-bold">InSight</h1>
        <h2 className="text-white text-[4vw] font-bold mb-[4vw]">Transaction History</h2>

        <div className="bg-white w-10/12 rounded-xl p-4 shadow-lg max-h-[60vh] overflow-y-auto">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 text-[4vw]">No transactions found.</p>
          ) : (
            <ul className="space-y-4">
              {transactions.map((tx) => (
                <li key={tx.id} className="border-b pb-2 text-[3.5vw]">
                  <div className="font-semibold">{tx.description}</div>
                  <div>${(tx.amount / 100).toFixed(2)} – {tx.status}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(tx.created * 1000).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <ButtonLinks />
      </div>
    </div>
  );
}
