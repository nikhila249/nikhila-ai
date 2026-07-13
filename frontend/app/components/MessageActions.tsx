"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  content: string;
}

export default function MessageActions({ content }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex justify-end mt-2">
      <button
        onClick={copyMessage}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
      >
        {copied ? (
          <>
            <Check size={16} />
            Copied
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy
          </>
        )}
      </button>
    </div>
  );
}
