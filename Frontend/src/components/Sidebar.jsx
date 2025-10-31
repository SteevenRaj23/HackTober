import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import PaidIcon from "@mui/icons-material/Paid";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
    { name: "Send Money", icon: <SendTimeExtensionIcon />, path: "/send-money" },
    { name: "Transactions", icon: <PaidIcon />, path: "/transactions" },
  ];

  // Highlight active menu based on current URL
  useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) setActive(currentItem.name);
  }, [location.pathname]);

  const handleClick = (item) => {
    setActive(item.name);
    navigate(item.path);
  };

  return (
    <aside className="w-64 bg-[#1e3a8e] text-white p-6 space-y-3 min-h-screen">
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => handleClick(item)}
            className={`flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-lg
              ${
                active === item.name
                  ? "bg-[#1d4ed8]"
                  : "bg-transparent hover:bg-[#1d4ed8]"
              }
              transition-colors duration-150`}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
