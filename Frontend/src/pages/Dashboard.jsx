import React, { use, useState } from "react";
import { cardsData } from "../components/CardsData";
import Card from "../components/Card";
import ChartsSection from "../components/ChartsSection";
import { useEffect } from "react";
import { auth, db } from "../components/firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState();
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
        const checkUser = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
            setUpiId(userDoc.data().upiId);
            }
            localStorage.setItem("upiId", userDoc.data().upiId);
            localStorage.setItem("userName", currentUser.displayName);
            console.log("Current User:", currentUser);
            console.log("UPI ID:", userDoc.data().upiId);
        }
        };
        checkUser();
    }, []);

        useEffect(() => {
        const checkUser = async () => {
            const currentUser = auth.currentUser; // Get the current user
            if (currentUser) {
                setUser(currentUser); // Set user state
                const userRef = doc(db, "users", currentUser.uid); // Reference to the user's document
                const userDoc = await getDoc(userRef); // Fetch the user document
                if (userDoc.exists()) {
                    const userData = userDoc.data(); // Get the user data
                    // Assuming userData.upiId is the UPI ID of the logged-in user
                    setUser((prev) => ({ ...prev, upiId: userData.upiId })); // Set UPI ID in user state
                } else {
                    console.error("User document does not exist");
                }
            } else {
                console.log("No user is currently logged in");
            }
        };
        checkUser();
    }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="font-medium text-gray-600 mt-2">
        Welcome back, {user ? user.displayName : "User"}
        {upiId && <span> (UPI ID: {upiId})</span>}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            amount={card.amount}
            iconType={card.iconType}
            iconBg={card.iconBg}
          />
        ))}
      </div>

      {/* Charts Section */}
      <ChartsSection />
    </>
  );
};

export default Dashboard;
