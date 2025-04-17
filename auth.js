// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { app } from "./firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

// Ensure auth state is persisted
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Auth persistence enabled"))
  .catch(error => console.error("Error enabling auth persistence:", error));


onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in: ", user);
    } else {
      console.log("No user is signed in.");
    }
  });

  // Sign-up function, updated with balance
export const signUp = async (email, password, userData) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      email: user.email,
      balance: 0,
      createdAt: new Date(),
    });

    console.log("User registered successfully:", user);
    await signOut(auth); // Sign out the user after creating
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

// Sign In (w/ balance)
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { user, balance: userDoc.data().balance };
    }

    return { user, balance: 0 };
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};

// Update user balance (used for Stripe)
export const updateUserBalance = async (userId, amount) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      balance: increment(amount),
    });
  } catch (error) {
    console.error("Error updating balance:", error);
  }
};

// Log Out function (unused atm)
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Exporting auth instance for use in other parts of the app
export { auth };
