"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ⭐ Current chat
  const [chatId, setChatId] = useState<string | null>(null);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
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
          chatId,
        }),
      });

      const data = await res.json();

      // Save chat id after first message
      if (!chatId && data.chatId) {
        setChatId(data.chatId);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <main className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center mt-32">
              <h1 className="text-5xl font-bold mb-4">
                👋 Hi Nikhila!
              </h1>

              <p className="text-zinc-400 text-lg">
                Your personal AI assistant is ready.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    msg.role === "user"
                      ? "bg-blue-600 rounded-2xl px-5 py-3 max-w-2xl"
                      : "bg-zinc-800 rounded-2xl px-5 py-3 max-w-2xl"
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>

        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          loading={loading}
        />
      </main>
    </div>
  );
}
