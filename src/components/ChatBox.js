"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "tailwindcss/tailwind.css";

const ChatBox = ({ setOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { user: "me", text: input }]);

    try {
      // Call the backend API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.message) {
        // Add bot reply to the chat
        setMessages((prev) => [...prev, { user: "bot", text: data.message }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { user: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }

    setInput(""); // Clear input field
  };

  return (
    <div className="fixed bottom-10 right-5 bg-gray-900 rounded-2xl shadow-xl w-full max-w-md h-[600px] flex flex-col border border-gray-700">
      {/* Header */}
      <div className="flex items-center bg-[#1eea66] p-4 rounded-t-2xl">
        <Image
          src="/images/solvars-icon.png"
          alt="Solvars Icon"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="ml-3 text-white font-bold text-lg">ChatBot</span>
        <button
          onClick={() => setOpen(false)}
          className="ml-auto text-white text-2xl font-semibold hover:text-gray-300"
        >
          ✖
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] p-3 rounded-lg text-sm md:text-base shadow-md whitespace-pre-wrap ${
              msg.user === "me"
                ? "bg-[#1eea66] text-white ml-auto"
                : "bg-gray-700 text-gray-300 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center p-4 border-t bg-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 border border-gray-600 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1eea66] focus:border-[#1eea66]"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-[#1eea66] text-white px-5 py-3 rounded-full font-semibold hover:bg-green-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
