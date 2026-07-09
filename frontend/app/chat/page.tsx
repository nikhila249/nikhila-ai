"use client";

import { useState } from "react";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "👋 Hi Nikhila! I'm your personal AI assistant. How can I help you today?",
    },
  ]);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage = {
      sender: "user" as const,
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <div className="w-72 border-r border-zinc-800 p-6">
        <h1 className="text-3xl font-bold">Nikhila AI</h1>

        <div className="mt-10 space-y-5 text-lg">
          <p>Dashboard</p>
          <p className="text-blue-400">Chat</p>
          <p>Profile</p>
          <p>Settings</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="text-3xl font-bold">
            Chat with Nikhila AI
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-2xl rounded-xl px-5 py-4 ${
                msg.sender === "user"
                  ? "bg-blue-600 ml-auto"
                  : "bg-zinc-800"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-zinc-800 rounded-xl px-5 py-4 max-w-xs">
              Thinking...
            </div>
          )}
        </div>

        <div className="border-t border-zinc-800 p-6">
          <div className="flex gap-4">
            <input
              className="flex-1 rounded-xl bg-zinc-800 px-5 py-4 outline-none"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 px-8 rounded-xl"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}