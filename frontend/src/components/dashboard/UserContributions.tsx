"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Calendar, ExternalLink, Filter } from "lucide-react";

interface Contribution {
  id: string;
  poolName: string;
  poolId: string;
  amount: number;
  date: string;
  status: "confirmed" | "pending" | "failed";
  transactionHash?: string;
}

const mockContributions: Contribution[] = [
  {
    id: "1",
    poolName: "Emergency Medical Fund",
    poolId: "pool-123",
    amount: 500,
    date: "2024-03-15",
    status: "confirmed",
    transactionHash: "0x1234...abcd",
  },
  {
    id: "2",
    poolName: "Education Support Initiative", 
    poolId: "pool-456",
    amount: 250,
    date: "2024-03-10",
    status: "confirmed",
    transactionHash: "0x5678...efgh",
  },
  {
    id: "3",
    poolName: "Community Development Project",
    poolId: "pool-789",
    amount: 1000,
    date: "2024-03-08",
    status: "pending",
  },
];

export function UserContributions() {
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending">("all");
  
  const filteredContributions = mockContributions.filter(contribution => {
    if (filter === "all") return true;
    return contribution.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-emerald-400 bg-emerald-500/20";
      case "pending": return "text-amber-400 bg-amber-500/20";
      case "failed": return "text-red-400 bg-red-500/20";
      default: return "text-slate-400 bg-slate-500/20";
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalContributed = mockContributions
    .filter(c => c.status === "confirmed")
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 text-emerald-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">My Contributions</h2>
            <p className="text-sm text-slate-400">
              Total contributed: {formatAmount(totalContributed)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-1">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              filter === "all" 
                ? "bg-emerald-500/20 text-emerald-400" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("confirmed")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              filter === "confirmed" 
                ? "bg-emerald-500/20 text-emerald-400" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              filter === "pending" 
                ? "bg-emerald-500/20 text-emerald-400" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {filteredContributions.length === 0 ? (
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-slate-600 mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">
            {filter === "all" ? "No contributions yet" : `No ${filter} contributions`}
          </h3>
          <p className="text-slate-500 mb-6">
            {filter === "all" 
              ? "Start making a difference by contributing to pools that matter to you"
              : `You don't have any ${filter} contributions at the moment`
            }
          </p>
          {filter === "all" && (
            <Link
              href="/discovery"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/30"
            >
              <Heart className="h-4 w-4" />
              Discover Pools
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredContributions.map((contribution) => (
            <div
              key={contribution.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-sm transition-colors hover:border-slate-700/80"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link
                      href={`/pools/${contribution.poolId}`}
                      className="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
                    >
                      {contribution.poolName}
                    </Link>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                      {contribution.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(contribution.date)}</span>
                    </div>
                    {contribution.transactionHash && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        <a
                          href={`https://stellar.expert/explorer/public/tx/${contribution.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-400 transition-colors"
                        >
                          View Transaction
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">
                    {formatAmount(contribution.amount)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}