import React from "react";
import { signInWithGoogle } from "../components/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../components/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";

const HomePage = () => {
    const navigate=useNavigate();

    const signInWithGoogle = async () =>{
       const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const loggedInUser = result.user;
        console.log("User Info:", loggedInUser);
         const userRef = doc(db, "users", loggedInUser.uid);
         const userDoc = await getDoc(userRef);
         console.log(userDoc.data().upiId)
         navigate('/dashboard');

        } catch (error) {
        console.error("Error signing in:", error);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white">
      {/* Logo */}
      {/* <img
        src="/path/to/zapcom-logo.png"
        alt="Zapcom Solutions Logo"
        className="w-32 h-32 mb-6"
      /> */}

      {/* Welcome Text */}
      <h1 className="text-5xl font-bold mb-4">Welcome to UpiShield</h1>

      {/* Sign In Button */}
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors duration-300"
       
        onClick={signInWithGoogle}
        //onClick={()=>navigate('/dashboard')}

      >
        Sign In
      </button>
    </div>
  );
};

export default HomePage;
