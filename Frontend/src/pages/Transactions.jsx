import React from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NetflixIcon from "@mui/icons-material/Subscriptions";
import { db, auth } from '../components/firebaseConfig' // Import your Firebase configuration
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HomeIcon from "@mui/icons-material/Home";

const transactions = [
  { id: 1, title: "Payment", date: "Dec 15, 2024", amount: -4200, type: "expense", icon: <ArrowDownwardIcon />, bg: "#dcfce7", color: "#60c484" },
  { id: 2, title: "Grocery Store", date: "Dec 14, 2024", amount: -142.5, type: "expense", icon: <LocalGroceryStoreIcon />, bg: "#fee2e2", color: "#e04040" },
  { id: 3, title: "Shell Gas Station", date: "Dec 13, 2024", amount: -68.2, type: "expense", icon: <LocalGasStationIcon />, bg: "#dbeafe", color: "#2563eb" },
  { id: 4, title: "Netflix Subscription", date: "Dec 12, 2024", amount: -15.99, type: "expense", icon: <NetflixIcon />, bg: "#f3e8ff", color: "#9434ea" },
];

const Transactions = () => {
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [transactionsData, setTransactionsData] = useState([]) // State to hold transactions

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const currentUser = auth.currentUser // Get the current user
  //     if (currentUser) {
  //       const userRef = doc(db, "users", currentUser.uid) // Reference to the user's document
  //       const userDoc = await getDoc(userRef) // Fetch the user document
  //       if (userDoc.exists()) {
  //         setUser(userDoc.data()) // Set user data
  //       } else {
  //         console.error("User document does not exist")
  //       }
  //     } else {
  //       console.log("No user is currently logged in")
  //     }
  //   }

  //   const fetchTransactions = async () => {
  //     if (!user) return // Ensure user is defined

  //     const transactionsCollection = collection(db, "transactions")
  //     const transactionsQuery = query(transactionsCollection, where("senderUPI", "==", user.upiId)) // Fetch transactions for the current user's UPI ID
  //     const transactionSnapshot = await getDocs(transactionsQuery)
  //     const transactionList = transactionSnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }))
  //     console.log(transactionList)
  //     //setTransactions(transactionList)
  //   }

  //   fetchUserData().then(fetchTransactions) // Fetch user data and then transactions
  // }, [user]) // Dependency on user

  // const filteredTransactions = transactions.filter(
  //   (transaction) =>
  //     transaction.recipientUPI.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     transaction.amount.toString().includes(searchTerm) ||
  //     transaction.remarks.toLowerCase().includes(searchTerm.toLowerCase())
  // )


    // ✅ Step 1: Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log("No user is logged in");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUser(userData);
      } else {
        console.error("User document not found");
      }
    };

    fetchUser();
  }, []);

  // ✅ Step 2: Fetch transactions for user’s UPI ID
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.upiId) return;

      const txRef = collection(db, "transactions");
      const q = query(txRef, where("senderUPI", "==", user.upiId));
      const snapshot = await getDocs(q);

      const txList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched transactions:", txList);

      const final = txList.map((t, index) => {
  const { icon, bg, color, title } = getCategoryStyle(t.remarks || "Transaction");
  return {
    id: index + 1,
    title,
    date: formatDate(t.createdAt.seconds),
    amount: -t.amount, // negative for outgoing 
    type: "expense",
    icon,
    bg,
    color,
    recipient: t.recipientUPI,
  };
});

console.log(final); 
setTransactionsData(final);
      
    };

    fetchTransactions();
  }, [user]);

  const formatDate = (seconds) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Choose icon + color based on remark type
const getCategoryStyle = (remark) => {
  switch (remark.toLowerCase()) {
    case "rent":
      return { icon: <HomeIcon />, bg: "#dcfce7", color: "#60c484", title: "Rent Payment" };
    case "utilities":
      return { icon: <ReceiptIcon />, bg: "#fee2e2", color: "#e04040", title: "Utility Bill" };
    case "other":
      return { icon: <LocalGasStationIcon />, bg: "#dbeafe", color: "#2563eb", title: "Other Expense" };
    default:
      return { icon: <ArrowDownwardIcon />, bg: "#f3e8ff", color: "#9434ea", title: "Transaction" };
  }
};


  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-700">Recent Transactions</h2>
        <span className="text-blue-600 text-sm cursor-pointer">View All</span>
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Transactions List */}
      <div className="space-y-4">
        {transactionsData.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center p-2 rounded hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              {/* Icon with custom background using inline styles */}
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: tx.bg, color: tx.color }}
              >
                {tx.icon}
              </div>

              {/* Title and Date */}
              <div>
                <p className="font-medium">{tx.title}</p>
                <p className="font-medium text-gray-400">recipient: {tx.recipient}</p>
                <p className="text-gray-400 text-sm">{tx.date}</p>
              </div>
            </div>

            {/* Amount */}
            <p
              className={
                tx.type === "income"
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {tx.amount > 0 ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
