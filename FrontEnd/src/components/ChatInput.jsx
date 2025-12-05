import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ onSend }) => {
  const { user } = useContext(UserContext);
  const [msg, setMsg] = useState("");
  const [warning, setWarning] = useState("");

  const sendMsg = () => {
    if (!user) {
      setWarning("⚠️ Please login first!");
      return;
    }
    if (msg.trim().length === 0) return;
    onSend(msg);
    setMsg("");
  };

  const handleType = (e) => {
    if (!user) setWarning("⚠️ Please login first!");
    else setWarning("");
    setMsg(e.target.value);
  };

  return (
    <div className="w-full border-t p-3 sm:p-4">
      {warning && (
        <p className="text-red-400 text-sm mb-2 text-center">{warning}</p>
      )}

      <div
        className="
        max-w-3xl mx-auto flex items-center 
        bg-[#40414F] border border-[#565869]
        rounded-full p-1 h-12
        sm:h-12
        "
      >
        <textarea
          value={msg}
          onChange={handleType}
          placeholder="Send a message..."
          className="
            flex-1 bg-transparent text-white
            resize-none outline-none
            px-3 py-2
            text-sm
            leading-tight
            h-full
            sm:text-base
          "
         
        />

        <button
          onClick={sendMsg}
          className={`ml-2 sm:ml-3 p-2 sm:p-3 rounded-full ${
            user
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          <FaPaperPlane size={14}  />
        </button>
      </div>

      <p className="text-gray-400 text-xs text-center mt-2">
        UI replica — AiGpt
      </p>
    </div>
  );
};

export default ChatInput;
