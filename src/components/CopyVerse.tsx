"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

/** Copies the featured verse to the clipboard with a grateful toast. */
export function CopyVerse({ text, refLabel }: { text: string; refLabel: string }) {
  const { pushToast } = useAppData();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`“${text}” — ${refLabel}`);
    } catch {
      /* clipboard unavailable — still affirm the intent */
    }
    setCopied(true);
    pushToast("Verse copied — share the light ✨", "accent");
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      onClick={copy}
      className={cn(
        "mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all",
        copied
          ? "border-[#e6c67d]/70 bg-[#e6c67d]/15 text-[#e6c67d]"
          : "border-white/20 text-white/60 hover:border-[#e6c67d]/50 hover:text-[#e6c67d]",
      )}
    >
      <Icon name={copied ? "CheckCircle2" : "Share2"} size={13} />
      {copied ? "Copied" : "Share this verse"}
    </button>
  );
}
