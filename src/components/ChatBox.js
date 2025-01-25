"use client";

import { useEffect, useState, useRef } from "react";
import { MdClose, MdRefresh } from "react-icons/md"; // Import React Icons
import HeroSection from "./HeroSection"; // Import the HeroSection component
import "tailwindcss/tailwind.css";

const ChatBox = ({ setOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null); // Reference for input field
  const chatContainerRef = useRef(null); // Reference for chat container

  useEffect(() => {
    // Retrieve messages from localStorage if they exist
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (savedMessages) {
      setMessages(savedMessages);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Save the messages to localStorage whenever the messages array changes
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }

    // Scroll chat container to the bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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

    setInput("");
  };

  const resetChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="fixed bottom-24 right-5 bg-gray-900 rounded-2xl shadow-xl w-full max-w-md h-[800px] flex flex-col border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center bg-[#1eea66] p-4 rounded-t-2xl">
        <span className="ml-3 text-white font-bold text-lg">ChatBot</span>

        {/* Close Button (on the left) */}
        <button
          onClick={resetChat}
          className="ml-auto text-white text-2xl font-semibold hover:text-gray-300"
        >
          <MdRefresh />
        </button>

        {/* Reset Button (on the right) */}
        <button
          onClick={() => setOpen(false)}
          className="ml-3 text-white text-xl font-semibold hover:text-gray-300"
        >
          <MdClose />
        </button>
      </div>

      {/* Chat Section */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 bg-gray-900 overflow-y-scroll"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer 10+
        }}
      >
        {/* Hero Section should be part of the scrollable content */}
        <HeroSection />

        {/* Messages */}
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
          ref={inputRef}
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
