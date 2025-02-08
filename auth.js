// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in: ", user);
    } else {
      console.log("No user is signed in.");
    }
  });

// Sign-up function
export const signUp = async (email, password, userData) => {
    try {
      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Get the user object
      const user = userCredential.user;
  
      // Create a user document in Firestore under the 'users' collection
      await setDoc(doc(collection(db, "users"), user.uid), {
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      console.log("User added to Firestore with UID: ", user.uid);
      return user; // Return the created user
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

// Sign In function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

// Log Out function
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Exporting auth instance for use in other parts of the app
export { auth };
