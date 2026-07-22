"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  MessageSquare,
  User,
  Settings,
  LayoutDashboard,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"; 
interface Chat {
  id: string;
  title: string;
}

interface SidebarProps {
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
} 

export default function Sidebar({
  onNewChat,
  onSelectChat,
}: SidebarProps) { 
  const [chats, setChats] = useState<Chat[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null); 
  const [search, setSearch] = useState(""); 
  const filteredChats = chats.filter((chat) =>
  chat.title.toLowerCase().includes(search.toLowerCase())
); 

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
        <input
  type="text"
  placeholder="Search chats..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-4 rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
/> 
        <h2 className="text-sm uppercase text-zinc-500 mb-4">
          Recent Chats
        </h2>

        <div className="space-y-2">
         {filteredChats.length === 0 ? ( 
            <p className="text-zinc-500 text-sm">
             {search
  ? "No matching chats found."
  : "No chats yet."}
  
            </p>
          ) : (
         filteredChats.map((chat) => ( 
  <div
    key={chat.id}
    className="relative group rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
  >
    <button
  onClick={() => onSelectChat(chat.id)}
  className="block w-full text-left px-4 py-3 pr-12"
>
  {chat.title}
</button> 

    <button
      onClick={() =>
        setOpenMenu(openMenu === chat.id ? null : chat.id)
      }
      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-zinc-600 opacity-0 group-hover:opacity-100 transition"
    >
      <MoreHorizontal size={18} />
    </button>

    {openMenu === chat.id && (
      <div className="absolute right-2 mt-1 w-36 rounded-lg bg-zinc-900 border border-zinc-700 shadow-lg z-10">
       <button
  onClick={async () => {
    const newTitle = prompt("Enter a new chat title:", chat.title);

    if (!newTitle || newTitle.trim() === "") return;

    try {
      const res = await fetch("/api/chats/rename", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: chat.id,
          title: newTitle,
        }),
      });

      if (!res.ok) {
        throw new Error("Rename failed");
      }

      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id
            ? { ...c, title: newTitle }
            : c
        )
      );

      setOpenMenu(null);
    } catch (error) {
      console.error(error);
      alert("Failed to rename chat.");
    }
  }}
  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-zinc-800"
>
  <Pencil size={16} />
  Rename
</button> 

       <button
  onClick={async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this chat?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch("/api/chats/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: chat.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setChats((prev) => prev.filter((c) => c.id !== chat.id));

      setOpenMenu(null);

      alert("Chat deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete chat.");
    }
  }}
  className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-zinc-800"
>
  <Trash2 size={16} />
  Delete
</button>  
      </div>
    )}
  </div>
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
