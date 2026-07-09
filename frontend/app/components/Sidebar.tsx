"use client";

import {
  Plus,
  MessageSquare,
  User,
  Settings,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar() {
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
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition py-3 font-semibold">
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

      {/* Chat History Placeholder */}
      <div className="flex-1 px-4 mt-8 overflow-y-auto">
        <h2 className="text-sm uppercase text-zinc-500 mb-4">
          Recent Chats
        </h2>

        <div className="space-y-2">

          <div className="rounded-lg bg-zinc-800 px-4 py-3 cursor-pointer hover:bg-zinc-700">
            Startup Ideas
          </div>

          <div className="rounded-lg bg-zinc-800 px-4 py-3 cursor-pointer hover:bg-zinc-700">
            Resume Builder
          </div>

          <div className="rounded-lg bg-zinc-800 px-4 py-3 cursor-pointer hover:bg-zinc-700">
            Fitness Plan
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-5 text-sm text-zinc-500">
        Nikhila AI v1.0
      </div>

    </aside>
  );
}