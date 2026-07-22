"use client";
import MessageActions from "../components/MessageActions"; 
import { useState, useRef, useEffect } from "react"; 
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import MessageRenderer from "../components/MessageRenderer";

interface Message {
  id: string; 
  role: "user" | "assistant";
  content: string;
  prompt?: string;
} 

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); 
  const abortControllerRef = useRef<AbortController | null>(null); 
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]); 

  async function sendMessage(prompt?: string) {
  const text = prompt ?? message;

  if (!text.trim() || loading) return; 
    

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text, 
    };
    

    setMessages((prev) => [...prev, userMessage]);
    let activeChatId = chatId;  
    const currentMessage = text; 
   if (!chatId) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: currentMessage.slice(0, 50),
    }),
  });

  const newChat = await response.json();

 activeChatId = newChat.id;
setChatId(newChat.id); 
} 

   if (!prompt) {
  setMessage("");
} 
    setLoading(true);

    try {
      const controller = new AbortController();
abortControllerRef.current = controller; 
      const res = await fetch("/api/chat/stream", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          signal: controller.signal, 
        body: JSON.stringify({
          message: currentMessage,
          chatId: activeChatId, 
        }),
      });

     const reader = res.body?.getReader();

if (!reader) {
  throw new Error("No response body");
}

const decoder = new TextDecoder();

const aiMessageId = (Date.now() + 1).toString();

setMessages((prev) => [
  ...prev,
  {
    id: aiMessageId,
    role: "assistant",
    content: "",
     prompt: currentMessage, 
  },
]);

let reply = "";

while (true) {
  const { done, value } = await reader.read();

  if (done) break;

  reply += decoder.decode(value, { stream: true });

  setMessages((prev) =>
    prev.map((msg) =>
      msg.id === aiMessageId
        ? {
            ...msg,
            content: reply,
          }
        : msg
    )
  );
} 
      
    } catch (error: any) {
  if (error.name === "AbortError") {
    console.log("Generation stopped");
  } else {
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
} 
     finally {
      setLoading(false);
    }
  }
  function stopGeneration() {
  abortControllerRef.current?.abort();
  setLoading(false);
} 
async function regenerateResponse(prompt?: string) {
  console.log("Prompt:", prompt);

  if (!prompt) return;

  await sendMessage(prompt);
} 

async function selectChat(id: string) {
  try {
    const res = await fetch(`/api/chat/${id}`);

    if (!res.ok) {
      throw new Error("Failed to load chat");
    }

    const data = await res.json();

    setChatId(id);

    setMessages(
      data.messages.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
      }))
    );
  } catch (error) {
    console.error(error);
  }
} 
  function newChat() {
    setMessages([]);
    setChatId(null);
    setMessage("");
  }

  return (
    <div className="flex h-screen bg-black text-white">
     <Sidebar
  onNewChat={newChat}
  onSelectChat={selectChat}
/> 

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
            <>
             {messages.map((msg) => (
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
      <MessageRenderer content={msg.content} />

      {msg.role === "assistant" && (
        <MessageActions
          content={msg.content}
          onRegenerate={() => regenerateResponse(msg.prompt)}
        />
      )}
    </div>
  </div>
))} 
              <div ref={messagesEndRef} /> 

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-2xl px-5 py-3 animate-pulse">
                    🤖 Nikhila AI is thinking...
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      <ChatInput
  message={message}
  setMessage={setMessage}
  sendMessage={sendMessage}
  stopGeneration={stopGeneration}
  loading={loading}
/> 
      </main>
    </div>
  );
}
