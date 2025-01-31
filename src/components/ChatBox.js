// /components/ChatBox.js
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { MdClose, MdRefresh } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import HeroSection from "./HeroSection"; // Assume a HeroSection component for the intro.

const ChatBox = ({ setOpen, url }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (savedMessages) {
      setMessages(savedMessages);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { user: "me", text: input }]);
    setInput("");

    setIsBotTyping(true);
    setTimeout(async () => {
      setIsBotTyping(false);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input, url: url }),
        });

        const data = await res.json();
        if (data.message) {
          setMessages((prev) => [...prev, { user: "bot", text: data.message }]);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            user: "bot",
            text: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    }, 2000);
  };

  const resetChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent Enter from adding new line
      e.preventDefault(); // Prevent the default behavior
      sendMessage();
    }
  };

  return (
    <div
      id="chatbot-container"
      className="fixed bottom-24 right-5 bg-gray-900 rounded-2xl shadow-xl w-[25vw] h-[70vh] max-h-[900px] flex flex-col border border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center bg-[#1eea66] p-4 rounded-t-2xl">
        <span className="ml-3 text-black font-bold text-lg">Solvars AI</span>
        <button
          onClick={resetChat}
          className="ml-auto text-black text-2xl font-semibold hover:text-gray-300"
        >
          <MdRefresh />
        </button>
        <button
          onClick={() => setOpen(false)}
          className="ml-3 text-black text-xl font-semibold hover:text-gray-300"
        >
          <MdClose />
        </button>
      </div>

      {/* Chat Section */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 bg-gray-900 overflow-y-auto"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <HeroSection />
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.user === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.user === "bot" && (
              <div className="flex items-end">
                <div className="flex-shrink-0 self-end">
                  <Image
                    src="/images/solvars-icon.png"
                    alt="Bot Icon"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="bg-gray-700 text-gray-300 p-3 rounded-lg ml-3 max-w-[75%] shadow-md text-sm md:text-base whitespace-pre-wrap">
                  {msg.text}
                </div>
              </div>
            )}

            {msg.user === "me" && (
              <div className="flex items-start w-full justify-end">
                <div className="bg-[#1eea66] text-black p-3 rounded-lg max-w-[75%] shadow-md text-sm md:text-base whitespace-pre-wrap">
                  {msg.text}
                </div>
                <div className="flex-shrink-0 self-start ml-3">
                  <FaUserAlt className="text-[#1eea66] text-2xl" />
                </div>
              </div>
            )}
          </div>
        ))}

        {isBotTyping && (
          <div className="flex items-center space-x-2 justify-start">
            <div className="flex-shrink-0">
              <Image
                src="/images/solvars-icon.png"
                alt="Bot Icon"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex items-center p-4 border-t bg-gray-800">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key
          rows={1}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1eea66] focus:border-[#1eea66] resize-none overflow-hidden"
          style={{ lineHeight: "1.5" }}
          onInput={(e) => {
            // Adjust the height dynamically
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-[#1eea66] text-black px-5 py-3 rounded-md font-semibold hover:bg-green-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
