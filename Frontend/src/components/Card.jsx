import React from "react";
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SavingsIcon from '@mui/icons-material/Savings';
import IncompleteCircleIcon from '@mui/icons-material/IncompleteCircle';

// Map icon names to actual components
const iconsMap = {
  MovingIcon: <MovingIcon className="text-[#30ae5f]" />,
  TrendingDownIcon: <TrendingDownIcon className="text-[#e24949]" />,
  SavingsIcon: <SavingsIcon className="text-[#2563eb]" />,
  IncompleteCircleIcon: <IncompleteCircleIcon className="text-[#9334ea]" />,
};

const Card = ({ title, amount, iconType, iconBg }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
      {/* Left: Title & Amount */}
      <div>
        <h3 className="text-[#a1adba] font-semibold">{title}</h3>
        <p className="mt-2 text-2xl font-bold text-[#1f293b]">{amount}</p>
      </div>

      {/* Right: Icon with background */}
      <div
        className="p-3 rounded-full flex items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        {iconsMap[iconType]}
      </div>
    </div>
  );
};

export default Card;
