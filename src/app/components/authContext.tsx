"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, logOut } from "../../../auth"; // Import from auth.js
import { onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { app } from "../../../firebaseConfig";

const db = getFirestore(app);

// Define types
interface AuthContextType {
  user: User | null;
  balance: number;
  loading: boolean;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeBalance: (() => void) | null = null; // Store Firestore listener

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        const userRef = doc(db, "users", user.uid);

        // Subscribe to real-time balance updates
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
          unsubscribeBalance(); // Stop listening when user logs out
        }
      }
    });

    return () => {
      unsubscribeAuth(); // Cleanup auth listener
      if (unsubscribeBalance) unsubscribeBalance(); // Cleanup Firestore listener
    };
  }, []);


  return (
    <AuthContext.Provider value={{ user, balance, loading, logout: logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
