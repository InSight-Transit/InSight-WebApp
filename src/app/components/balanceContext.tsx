"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";

const db = getFirestore(app);

interface BalanceContextType {
  balance: number;
  setBalance: (balance: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setBalance(userDocSnap.data().balance || 0);
        } else {
          await setDoc(userDocRef, { balance: 0 }, { merge: true });
          setBalance(0);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
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
