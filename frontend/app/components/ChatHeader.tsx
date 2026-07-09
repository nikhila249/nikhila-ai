"use client";

import { Bell, Search, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900 px-8 py-5 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Sparkles className="text-blue-500" size={28} />
          Nikhila AI
        </h1>

        <p className="text-zinc-400 mt-1">
          Your personal AI assistant
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
          <Search size={20} />
        </button>

        <button className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
          <Bell size={20} />
        </button>

        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
          N
        </div>

      </div>

    </header>
  );
}
