"use client";

import { useState } from "react";
import Link from "next/link";
import { Droplets, Plus, Filter, Calendar, Target } from "lucide-react";

interface Pool {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  deadline: string;
  status: "active" | "completed" | "expired";
  isPrivate: boolean;
}

const mockPools: Pool[] = [
  {
    id: "1",
    name: "Computer Science Scholarship",
    description: "Supporting students pursuing computer science degrees",
    targetAmount: 10000,
    raisedAmount: 7500,
    deadline: "2024-06-15",
    status: "active",
    isPrivate: false,
  },
  {
    id: "2", 
    name: "Medical Research Fund",
    description: "Private pool for medical research initiatives",
    targetAmount: 25000,
    raisedAmount: 25000,
    deadline: "2024-05-01",
    status: "completed",
    isPrivate: true,
  },
];

export function UserPools() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  
  const filteredPools = mockPools.filter(pool => {
    if (filter === "all") return true;
    return pool.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-emerald-400 bg-emerald-500/20";
      case "completed": return "text-blue-400 bg-blue-500/20";
      case "expired": return "text-red-400 bg-red-500/20";
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Droplets className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">My Pools</h2>
        </div>
        
        <div className="flex items-center gap-3">
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
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                filter === "active" 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                filter === "completed" 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Completed
            </button>
          </div>
          
          <Link
            href="/dashboard/pools/create"
            className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/30"
          >
            <Plus className="h-4 w-4" />
            Create Pool
          </Link>
        </div>
      </div>

      {filteredPools.length === 0 ? (
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-12 text-center">
          <Droplets className="mx-auto h-12 w-12 text-slate-600 mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">
            {filter === "all" ? "No pools created yet" : `No ${filter} pools`}
          </h3>
          <p className="text-slate-500 mb-6">
            {filter === "all" 
              ? "Create your first pool to start raising funds for your cause"
              : `You don't have any ${filter} pools at the moment`
            }
          </p>
          {filter === "all" && (
            <Link
              href="/dashboard/pools/create"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/30"
            >
              <Plus className="h-4 w-4" />
              Create Your First Pool
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPools.map((pool) => (
            <div
              key={pool.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm transition-colors hover:border-slate-700/80"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{pool.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pool.status)}`}>
                      {pool.status}
                    </span>
                    {pool.isPrivate && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium text-amber-400 bg-amber-500/20">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{pool.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-300">
                        {formatAmount(pool.raisedAmount)} / {formatAmount(pool.targetAmount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-300">{pool.deadline}</span>
                    </div>
                  </div>
                </div>
                
                <Link
                  href={`/dashboard/pools/${pool.id}`}
                  className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700/50 hover:text-white"
                >
                  Manage
                </Link>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-slate-300">
                    {Math.round((pool.raisedAmount / pool.targetAmount) * 100)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    style={{ width: `${Math.min((pool.raisedAmount / pool.targetAmount) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}