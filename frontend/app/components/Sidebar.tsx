"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Chat", href: "/chat" },
    { name: "Settings", href: "/settings" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <aside className="w-72 bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        Nikhila AI
      </h1>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block w-full rounded-lg px-4 py-3 transition ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "hover:bg-zinc-800 hover:text-blue-400"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}