"use client";

import { useState } from "react";
import { User, Wallet, Copy, Check } from "lucide-react";

interface UserProfileProps {
  walletAddress?: string;
  username?: string;
  joinDate?: string;
}

export function UserProfile({ 
  walletAddress = "GCKFBEIYTKP...", 
  username = "Anonymous User",
  joinDate = "January 2024"
}: UserProfileProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500">
          <User className="h-8 w-8 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-white">{username}</h2>
          <p className="text-sm text-slate-400 mb-3">Member since {joinDate}</p>
          
          {walletAddress && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-3">
              <Wallet className="h-4 w-4 text-slate-400" />
              <code className="flex-1 text-sm text-slate-300 font-mono truncate">
                {walletAddress}
              </code>
              <button
                onClick={copyAddress}
                className="flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}