import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import {
  FaPlus,
  FaHistory,
  FaRegStar,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, logout, loading } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClick = (e) => {
      if (
        isOpen &&
        !e.target.closest(".sidebar-box") &&
        !e.target.closest(".hamburger-btn")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <>
      {/* 🔥 HAMBURGER FOR MOBILE — positioned EXACT near sidebar */}
      <button
        className="hamburger-btn md:hidden fixed top-4 left-4 z-50 text-white bg-[#202123] border border-[#3F4045] p-3 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={20} />
      </button>

      {/* 🔥 SIDEBAR AREA */}
      <div
        className={`
          sidebar-box fixed md:static z-9999 top-0 left-0 h-screen w-64 
          bg-[#202123] text-white border-r border-[#3F4045]
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* USER SECTION */}
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : user ? (
          <div className="p-3 flex items-center gap-3 border-b border-[#3F4045]">
            <FaUserCircle size={44} className="text-gray-400" />
            <div>
              <h2 className="text-[15px] font-semibold">{user?.name}</h2>
              <p className="text-[13px] text-gray-400">{user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-[#3F4045] pb-7">
            <p className="text-gray-400 text-sm">Please login to continue</p>
          </div>
        )}

        {/* OPTIONS */}
        <div className="p-4">
          <button className="w-full flex items-center gap-2 bg-[#343541] hover:bg-[#3E3F4A] transition p-3 rounded-lg mb-4">
            <FaPlus className="text-gray-300" />
            New Chat
          </button>

          <div className="space-y-2 text-gray-300">
            <button className="flex items-center gap-3 w-full p-2 hover:bg-[#343541] rounded-lg">
              <FaHistory /> Recent Chats
            </button>

            <button className="flex items-center gap-3 w-full p-2 hover:bg-[#343541] rounded-lg">
              <FaRegStar /> Saved Replies
            </button>

            <button className="flex items-center gap-3 w-full p-2 hover:bg-[#343541] rounded-lg">
              <FaCog /> Settings
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        {user && (
          <div className="p-4 border-t border-[#3F4045] mt-auto">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full p-2 hover:bg-[#343541] rounded-lg text-red-400"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
