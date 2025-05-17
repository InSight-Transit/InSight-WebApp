/*
  authContext component
  This file contains the AuthProvider component and the useAuth hook.
  This provides authentication context to the pages that require it.
*/

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, logOut } from "../../../auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { app } from "../../../firebaseConfig";

const db = getFirestore(app);

interface AuthContextType {
  user: User | null;
  balance: number;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeBalance: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        const userRef = doc(db, "users", user.uid);

        unsubscribeBalance = onSnapshot(
          userRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              setBalance(docSnapshot.data().balance || 0);
            }
          },
          (error) => {
            console.error("❌ Firestore error:", error);
          }
        );
      } else {
        setBalance(0);
        if (unsubscribeBalance) {
          unsubscribeBalance();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeBalance) unsubscribeBalance();
    };
  }, []);


  return (
    <AuthContext.Provider value={{ user, balance, loading, logout: logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
