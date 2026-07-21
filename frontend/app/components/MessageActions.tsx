"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Props = {
  content: string;
  onRegenerate?: () => void;
};

export default function MessageActions({
  content,
  onRegenerate,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex items-center gap-4 mt-2">
      <button
        onClick={copyMessage}
        className="flex items-center gap-1 text-zinc-400 hover:text-white transition text-sm"
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

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="text-zinc-400 hover:text-white transition text-sm"
        >
          🔄 Regenerate
        </button>
      )}
    </div>
  );
} 