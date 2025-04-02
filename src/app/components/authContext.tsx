"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, logOut } from "../../../auth"; // Import from auth.js
import { onAuthStateChanged, User } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Fetch balance from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setBalance(userDoc.data().balance);
        }
      } else {
        setUser(null);
        setBalance(0);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
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
