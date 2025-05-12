import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { useAuth } from "./authContext";

// Define the structure of a transaction
interface Transaction {
  id: string;
  description: string;
  amount: number;
  status: string;
  created: number; // Timestamp in seconds
}

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [user]);

  return transactions;
}
