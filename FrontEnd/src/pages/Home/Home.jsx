import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ChatInput from "../../components/ChatInput";
import "../index.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch history
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      try {
        const res = await fetch(
          "http://localhost:4001/api/ai-response/history",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setMessages(data);
        }
      } catch (err) {
        console.log("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, [user]);

  useEffect(scrollToBottom, [messages]);

  // Send message
  const handleSend = async (msg) => {
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { text: msg, sender: "user" }]);

    try {
      const res = await fetch("http://localhost:4001/api/ai-response/ask", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "❌ " + (data.reply || data.message), sender: "bot" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Server error occurred", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-[#202123] text-white min-h-120">
      {/* SIDEBAR — hidden on mobile */}
      <div className="z-999">
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col ">
        {/* Header sticky */}
        <div className="sticky top-0 z-20 bg-[#202123]">
          <Header />
        </div>

        {/* Chat Area */}
        <main
          className="
            flex-1 flex flex-col justify-between 
            overflow-y-auto p-4 sm:p-6 
            bg-[#2A2B33]
          "
        >
          <div
            className="
              flex flex-col space-y-2 
              mb-4 max-w-4xl mx-auto w-full
              overflow-y-auto pr-1 no-scrollbar
            "
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl break-words text-sm sm:text-base ${
                  m.sender === "user"
                    ? "self-end bg-white text-black max-w-[80%] sm:max-w-[70%]"
                    : "self-start bg-gray-700 text-white max-w-[80%] sm:max-w-[70%]"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input sticky bottom */}
          <div className="sticky bottom-0 bg-[#2A2B33] pb-4">
            <ChatInput onSend={handleSend} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
