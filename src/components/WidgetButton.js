"use client";

import React, { useState, useRef } from "react";
import ChatBox from "@/components/ChatBox";
import { FiX, FiMessageSquare } from "react-icons/fi";
import { useClickAway } from "react-use"; // Detects clicks outside
import "tailwindcss/tailwind.css";

const WidgetButton = () => {
  const [open, setOpen] = useState(false);
  const chatBoxRef = useRef(null);

  // Close the chatbox when clicking outside
  useClickAway(chatBoxRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <div>
      {/* Widget Button */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 w-16 h-16 bg-[#1eea66] rounded-full cursor-pointer shadow-lg z-50 flex items-center justify-center"
      >
        {open ? (
          <FiX className="text-black text-3xl" />
        ) : (
          <FiMessageSquare className="text-black text-3xl" />
        )}
      </div>

      {/* ChatBox */}
      {open && (
        <div ref={chatBoxRef}>
          <ChatBox setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};

export default WidgetButton;
