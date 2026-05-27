import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { UserPools } from "@/components/dashboard/UserPools";
import { UserContributions } from "@/components/dashboard/UserContributions";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-400">
          Welcome to your Nevo dashboard. Manage your pools and track your contributions.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <UserProfile />
          <DashboardStats />
          <UserPools />
          <UserContributions />
        </div>

        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
