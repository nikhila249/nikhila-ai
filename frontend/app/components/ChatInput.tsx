"use client";

import { SendHorizonal } from "lucide-react";

type Props = {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
  loading: boolean;
};

export default function ChatInput({
  message,
  setMessage,
  sendMessage,
  loading,
}: Props) {
  return (
    <div className="border-t border-zinc-800 bg-zinc-950 p-6">
      <div className="flex gap-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask Nikhila AI anything..."
          className="flex-1 rounded-2xl bg-zinc-900 border border-zinc-700 px-5 py-4 text-white outline-none focus:border-blue-500 transition"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 rounded-2xl flex items-center justify-center disabled:opacity-50"
        >
          <SendHorizonal size={22} />
        </button>
      </div>
    </div>
  );
}
