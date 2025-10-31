import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaymentVerificationModal from "../components/PaymentVerificationModal";

const SendMoney = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handleVerify = () => {
    if (!upiId) {
      alert("Please enter a valid UPI ID first.");
      return;
    }
    setShowVerification(true);
  };

  const handleSendMoney = () => {
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    const options = {
      key: "rzp_test_tk6FyCpRdK9ajI",
      amount: parseFloat(amount) * 100, // amount in paise
      currency: "INR",
      name: "ZapiUPI Payment",
      description: "Payment to UPI ID: " + upiId,
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
        vpa: upiId,
      },
      notes: {
        upi_id: upiId,
        remark: remark || "No remark",
      },
      theme: {
        color: "#7c3aed",
      },
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Optionally call backend to store payment details
      },
      modal: {
        ondismiss: function () {
          console.log("Payment popup closed");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (showVerification) {
    return <PaymentVerificationModal upiIdRecipient={upiId} onDone={() => setShowVerification(false)} />;
  }

  return (
    <div className="flex justify-center items-start pt-8 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="bg-white w-[380px] rounded-2xl shadow-md p-5">
        {/* Header */}
        <div className="flex items-center mb-4">
          <ArrowBackIcon className="text-gray-700 cursor-pointer" />
          <h2 className="text-lg font-semibold mx-auto text-gray-800">
            Pay to UPI ID
          </h2>
        </div>

        {/* UPI Input */}
        <label className="block text-sm text-gray-600 mb-1">To UPI ID</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="username@bank"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 "
          />
          <button
            onClick={handleVerify}
            className="hover:bg-[#1e3a8e]  font-semibold text-white px-4 rounded-lg bg-[#1d4ed8]"
          >
            Verify
          </button>
        </div>

        {/* Amount */}
        <label className="block text-sm text-gray-600 mb-1">Enter Amount</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4">
          <span className="text-gray-500 text-lg">₹</span>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-2 outline-none text-gray-800 text-lg"
          />
        </div>

        {/* Remarks */}
        <label className="block text-sm text-gray-600 mb-1">
          Add Remarks (optional)
          </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Rent", "Utilities", "Groceries", "Entertainment", "Other"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setRemark(tag)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  remark === tag
                    ? "bg-[#1d4ed8] text-white "
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMoney}
          className="w-full hover:bg-[#1e3a8e] bg-[#1d4ed8] text-white font-semibold py-2 rounded-lg transition"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
