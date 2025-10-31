// Import Firebase core and auth modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your Firebase project configuration
const firebaseConfig = {
   apiKey: "AIzaSyBNL_dZJpI21o4Y8UQR7WxgVi0bYcC0xQc",
  authDomain: "hackai-478b6.firebaseapp.com",
  projectId: "hackai-478b6",
  storageBucket: "hackai-478b6.firebasestorage.app",
  messagingSenderId: "611486297749",
  appId: "1:611486297749:web:7bd37ab9f3ebdc1ec2359c",
  measurementId: "G-BR8Y2RN1CL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Helper function for Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    alert(`Welcome ${result.user.displayName}`);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};
