"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  role: string;
  content: string;
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function loadChat() {
      const { id } = await params;

     const res = await fetch(`/api/chat/${id}`); 

      if (!res.ok) return;

      const data = await res.json();
      console.log("API Response:", data); 

      setMessages(data.messages ?? []);
    }

    loadChat();
  }, [params]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-zinc-500">No messages found.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "text-right"
                  : "text-left"
              }
            >
              <div className="inline-block rounded-xl bg-zinc-800 px-4 py-3">
                {message.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
