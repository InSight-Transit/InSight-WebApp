"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

type BalanceContextType = {
  balance: number;
  setBalance: (balance: number) => void;
  updateBalanceInFirestore: (amount: number) => Promise<void>;
  refreshBalance: () => Promise<void>;
};

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await refreshBalance(user.uid);
      } else {
        setUserId(null);
        setBalance(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshBalance = async (uid?: string) => {
    const id = uid || userId;
    if (!id) return;
    try {
      const userRef = doc(db, "users", id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setBalance(userDoc.data().balance || 0);
      }
    } catch (error) {
      console.error("Error refreshing balance:", error);
    }
  };

  const updateBalanceInFirestore = async (amount: number) => {
    if (!userId) return;
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { balance: amount });
      setBalance(amount);
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  return (
    <BalanceContext.Provider value={{ balance, setBalance, updateBalanceInFirestore, refreshBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
}
