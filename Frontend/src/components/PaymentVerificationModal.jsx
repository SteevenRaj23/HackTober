import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check,  Loader2 } from "lucide-react";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
 import ViewDetailsPopup from "../components/ViewDetailsPopup";
import { transactionData } from "../components/TransactionData";
import { useEffect } from "react";
import { db } from "../components/firebaseConfig";
import Confetti from "react-confetti";
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { getRiskDetails } from "./getRiskDetails";


const PaymentVerificationModal = ({ onDone,upiIdRecipient }) => {
  const [status, setStatus] = useState("verifying"); // start verifying immediately
  const [showConfetti, setShowConfetti] = useState(false);
   const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const[TransactionRiskData,setTransactionRiskData]=useState([]);

//   React.useEffect(() => {
//     // Simulate API delay
//      const usersRef = collection(db, "users");

          
      
//           // Query the collection for a matching UPI ID
//           const q = query(usersRef, where("upiId", "==", recipientUpiId));
//           const querySnapshot = await getDocs(q);
      
//           // Check if a matching document was found
//           if (querySnapshot.empty) {
//             setVerificationStatus("invalid");
//             return;
//           }

       
      
//           // Get the first document from the query results
//           const userDoc = querySnapshot.docs[0]; // Assuming UPI ID is unique
//           const modelData = userDoc.data().modelData;

//              console.log(userDoc);
//              console.log("Model Data:", modelData); // For debugging
      
//           // Ensure features are in the correct order
//           const features = [
//             modelData["Transaction Amount"] || 0,
//             modelData["Transaction Frequency"] || 0,
//             modelData["Recipient Blacklist Status"] || 0,
//             modelData["Device Fingerprinting"] || 0,
//             modelData["VPN or Proxy Usage"] || 0,
//             modelData["Behavioral Biometrics"] || 0,
//             modelData["Time Since Last Transaction"] || 0,
//             modelData["Social Trust Score"] || 0,
//             modelData["Account Age"] || 0,
//             modelData["High-Risk Transaction Times"] || 0,
//             modelData["Past Fraudulent Behavior Flags"] || 0,
//             modelData["Location-Inconsistent Transactions"] || 0,
//             modelData["Normalized Transaction Amount"] || 0,
//             modelData["Transaction Context Anomalies"] || 0,
//             modelData["Fraud Complaints Count"] || 0,
//             modelData["Merchant Category Mismatch"] || 0,
//             modelData["User Daily Limit Exceeded"] || 0,
//             modelData["Recent High-Value Transaction Flags"] || 0,
//             modelData["Recipient Verification Status_suspicious"] || 0,
//             modelData["Recipient Verification Status_verified"] || 0,
//             modelData["Geo-Location Flags_normal"] || 0,
//             modelData["Geo-Location Flags_unusual"] || 0,
//           ];
      
//           console.log("Features sent to Flask:", features); // For debugging

//     const dummy = [
//   0.0330360099,
//   0.3846153846,
//   0,
//   0,
//   0,
//   0.1987717595,
//   0.8335563162,
//   0.1618463446,
//   0.2328385919,
//   0,
//   0,
//   0,
//   0.3898685556,
//   0.1089585998,
//   0.2,
//   0,
//   1,
//   0,
//   0,
//   1,
//   1,
//   0
// ]
//     const handlePredict = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5001/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(dummy),
//       });

//       const data = await response.json();
//       console.log(data.prediction[0])
//       if(data.prediction[0]===0){
//         setStatus("failed");
//       }else{
//         setStatus("success");
//       }
//      // setResult(data.prediction ? data.prediction[0] : "Error");
//     } catch (error) {
//       console.error("Error:", error);
//       //setResult("API Error");
//     }
//   };
//    handlePredict();


//     // const timer = setTimeout(() => {
//     //   const isSuccess = Math.random() > 0.5;
//     //   setStatus(isSuccess ? "success" : "failed");
//     //   if (isSuccess) setShowConfetti(true);
//     // }, 3000);

//     // return () => clearTimeout(timer);
//   }, []);

   useEffect(() => {
    const verifyAndPredict = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("upiId", "==", upiIdRecipient));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setStatus("invalid");
          return;
        }

        const userDoc = querySnapshot.docs[0];
        const modelData = userDoc.data().modelData;

        console.log("Model Data:", modelData);

   const transactionRisk = Object.entries(modelData)
    .filter(([key]) => key !== "Label") // Ignore label
    .map(([feature, value]) => ({
      feature,
      value,
      risk: getRiskDetails(feature, value)
    }))

   setTransactionRiskData(transactionRisk);

    console.log(transactionRisk)

        // Extract features in correct order
        const features = [
          modelData["Transaction Amount"] || 0,
          modelData["Transaction Frequency"] || 0,
          modelData["Recipient Blacklist Status"] || 0,
          modelData["Device Fingerprinting"] || 0,
          modelData["VPN or Proxy Usage"] || 0,
          modelData["Behavioral Biometrics"] || 0,
          modelData["Time Since Last Transaction"] || 0,
          modelData["Social Trust Score"] || 0,
          modelData["Account Age"] || 0,
          modelData["High-Risk Transaction Times"] || 0,
          modelData["Past Fraudulent Behavior Flags"] || 0,
          modelData["Location-Inconsistent Transactions"] || 0,
          modelData["Normalized Transaction Amount"] || 0,
          modelData["Transaction Context Anomalies"] || 0,
          modelData["Fraud Complaints Count"] || 0,
          modelData["Merchant Category Mismatch"] || 0,
          modelData["User Daily Limit Exceeded"] || 0,
          modelData["Recent High-Value Transaction Flags"] || 0,
          modelData["Recipient Verification Status_suspicious"] || 0,
          modelData["Recipient Verification Status_verified"] || 0,
          modelData["Geo-Location Flags_normal"] || 0,
          modelData["Geo-Location Flags_unusual"] || 0,
        ];

        console.log("Features sent to Flask:", features);

        // Call your Flask API
        const response = await fetch("http://127.0.0.1:5001/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(features),
        });

        const data = await response.json();
        console.log("Flask API Response:", data);

        if (data.prediction && data.prediction[0] === 0) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Error during fraud check:", error);
        setStatus("error");
      }
    };

    verifyAndPredict();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      {/* Popup Modal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="relative z-10 bg-white text-white p-8 rounded-3xl shadow-2xl w-[90%] md:w-[420px] border border-white/20"
        >
          <h1 className="text-2xl font-bold mb-6 tracking-wide text-center text-[#1d75e8]">
            ZapAI Verification
          </h1>

          {/* Verifying */}
          {status === "verifying" && (
            <motion.div
              className="flex flex-col items-center justify-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Loader2 className="w-16 h-16 text-[#1d75e8]" />
              </motion.div>
              <p className="text-lg text-[#595959] font-medium">
                ZapiUPI is verifying your payment...
              </p>
            </motion.div>
          )}

          {/* Success */}
          {status === "success" && (
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
            >
              {/* <CheckCircle2 className="w-16 h-16 bg-[#00bfa6] text-white mb-4" /> */}
              <div className="bg-[#00bfa6] w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md">
  <Check className="w-10 h-10 text-white" />
</div>

              <h2 className="text-xl font-semibold text-[#595959] text-center">
                Payment Verified Successfully!
              </h2>
              <motion.button
                onClick={onDone}
                className="mt-8 bg-[#00bfa6]  text-white font-semibold py-2 px-8 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                Done
              </motion.button>
            </motion.div>
          )}

          {/* Failed */}
          {status === "failed" && (
            <>
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            >
               <div className="bg-red-400 w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md">
<CloseIcon className="w-10 h-10 text-white" />
</div>

              <h2 className="text-xl font-semibold text-[#595959] text-center">
                Fraudulent Transaction Detected!
              </h2>
              {/* <motion.button
                onClick={onDone}
                className="mt-8 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                Done
              </motion.button> */}

                 
                  {/* ❌ Buttons Row */}








            </motion.div>
                <div className="flex justify-center gap-5 mt-6  px-4">
      <button
        onClick={onDone}
        className="flex-1 bg-red-400 text-white font-semibold  py-2 px-4 w-[130px] rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        whileHover={{ scale: 1.05 }}
      >
        Done
      </button>

      <button
         onClick={() => setShowDetailsPopup(true)}
        className="flex-1 bg-red-400 text-white font-semibold  py-2 px-4 w-[130px] rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        whileHover={{ scale: 1.05 }}
      >
        View Details
      </button>


    </div></>
          )}
        </motion.div>
      </AnimatePresence>
     
      {/* View Details Popup */}
      {showDetailsPopup && (
        <ViewDetailsPopup
          data={TransactionRiskData?TransactionRiskData:[]}
          onClose={() => setShowDetailsPopup(false)}
        />
      )}




    </div>
  );
};

export default PaymentVerificationModal;
