import React from "react";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
   <div className="flex justify-between items-center bg-white text-[#256bec] px-4 py-2 shadow-md">

      {/* Left: App Name */}
      <h1 className="text-2xl font-bold">UpiShield</h1>

      {/* Right: Search & Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-black bg-[#f3f4f6] focus:outline-none w-64 focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
