"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  MessageSquare,
  User,
  Settings,
  LayoutDashboard,
} from "lucide-react";

interface Chat {
  id: string;
  title: string;
}

interface SidebarProps {
  onNewChat: () => void;
}

export default function Sidebar({ onNewChat }: SidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    async function loadChats() {
      try {
        const res = await fetch("/api/chats");

        if (!res.ok) {
          throw new Error("Failed to load chats");
        }

        const data = await res.json();
        setChats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadChats();
  }, []);

  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-white">
          🤖 Nikhila AI
        </h1>
      </div>

      {/* New Chat */}
      <div className="p-5">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition py-3 font-semibold"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2">

        <button className="flex items-center gap-3 w-full rounded-xl px-4 py-3 hover:bg-zinc-800 transition">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full rounded-xl px-4 py-3 bg-zinc-800 text-blue-400">
          <MessageSquare size={20} />
          Chat
        </button>

        <button className="flex items-center gap-3 w-full rounded-xl px-4 py-3 hover:bg-zinc-800 transition">
          <User size={20} />
          Profile
        </button>

        <button className="flex items-center gap-3 w-full rounded-xl px-4 py-3 hover:bg-zinc-800 transition">
          <Settings size={20} />
          Settings
        </button>

      </nav>

      {/* Recent Chats */}
      <div className="flex-1 px-4 mt-8 overflow-y-auto">
        <h2 className="text-sm uppercase text-zinc-500 mb-4">
          Recent Chats
        </h2>

        <div className="space-y-2">
          {chats.length === 0 ? (
            <p className="text-zinc-500 text-sm">
              No chats yet.
            </p>
          ) : (
            chats.map((chat) => (
              <a
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block rounded-lg bg-zinc-800 px-4 py-3 hover:bg-zinc-700 transition"
              >
                {chat.title}
              </a>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-5 text-sm text-zinc-500">
        Nikhila AI v1.0
      </div>

    </aside>
  );
}
