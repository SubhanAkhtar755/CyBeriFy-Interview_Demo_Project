import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaCheckCircle, FaChevronDown } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mobile: toggle on click
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-[#2A2B33] border-b border-[#3F4045] text-white p-4 flex justify-between items-center relative shadow-md">

      {/* LEFT SIDE AiGpt + Arrow (hidden on mobile) */}
      <div
        className="relative cursor-pointer flex items-center select-none hidden md:flex" // hidden on mobile, flex on md+
        onMouseEnter={() => window.innerWidth > 768 && setDropdownOpen(true)}
        onMouseLeave={() => window.innerWidth > 768 && setDropdownOpen(false)}
        onClick={() => window.innerWidth < 768 && toggleDropdown()}
      >
        <span className="font-bold text-lg">AiGpt</span>
        <FaChevronDown className={`ml-1 mt-1 text-gray-300 transition ${dropdownOpen ? "rotate-180" : ""}`} />

        {/* DROPDOWN MENU */}
        {dropdownOpen && (
          <div className="absolute top-10 left-0 bg-[#1F2026] text-white p-4 rounded shadow-lg w-64 z-20 animate-fadeIn md:block hidden">
            <div className="flex items-center mb-2">
              <FaInfoCircle className="mr-2 text-gray-300" />
              <span className="font-semibold">Update Notes</span>
            </div>

            <ul className="text-sm space-y-1 mb-3">
              <li>- Chat input restricted for guests</li>
              <li>- Sidebar updated</li>
              <li>- Minor bug fixes</li>
            </ul>

            <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
              <div className="flex items-center">
                <FaCheckCircle className="mr-1 text-green-400" /> v1.01
              </div>
              <span>💡 Paid version coming soon</span>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE BUTTON (always right) */}
      <div className="ml-auto">
        {user ? (
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 text-sm rounded"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
