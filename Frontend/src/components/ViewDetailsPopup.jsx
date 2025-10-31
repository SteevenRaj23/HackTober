import React from "react";
import { motion } from "framer-motion";

const ViewDetailsPopup = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-center mb-4 text-[#1d75e8]">Transaction Details</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100  top-0">
              <th className="text-left px-4 py-2 border-b">Feature</th>
              <th className="text-left px-4 py-2 border-b">Value</th>
              <th className="text-left px-4 py-2 border-b">Risk</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{item.feature}</td>
                <td className="px-4 py-2 border-b">{item.value}</td>
                <td className="px-4 py-2 border-b">{item.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-[#1d75e8] text-white px-4 py-2 rounded-full shadow hover:shadow-lg transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewDetailsPopup;
