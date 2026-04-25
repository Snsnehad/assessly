import { Activity, FileCheck2, LoaderCircle, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatsCard from "../../components/StatsCard";
import { useFetch } from "../../hooks/useFetch";
import { mockApi } from "../../utils/mockApi";

export default function AdminDashboardPage() {
  const analyticsState = useFetch(() => mockApi.getAdminOverview(), []);

  if (analyticsState.loading) {
    return <div className="glass-card p-6">Loading analytics...</div>;
  }

  const {
    totalUsers,
    inProgressUsers,
    completedAssessments,
    reportGeneratedCount,
    progressTrend,
    sectionCompletion,
    recentActivity,
  } = analyticsState.data;

  const stats = [
    { icon: Users, label: "Total Users", value: totalUsers, change: "All active accounts" },
    { icon: LoaderCircle, label: "In-Progress Users", value: inProgressUsers, change: "Currently writing" },
    { icon: FileCheck2, label: "Completed Assessments", value: completedAssessments, change: "Finished attempts" },
    { icon: Activity, label: "Reports Generated", value: reportGeneratedCount, change: "Final reports only" },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.label}
            {...stat}
            tone={index % 2 === 0 ? "brand" : "emerald"}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card h-[360px] p-6">
          <h3 className="mb-4 text-xl font-semibold">Single assessment progress</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={progressTrend}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.15} />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="completed" stroke="#4f46e5" fill="url(#colorCompleted)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card h-[360px] p-6">
          <h3 className="mb-4 text-xl font-semibold">Section completion</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectionCompletion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.15} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass-card p-6">
        <h3 className="text-xl font-semibold">Recent activity</h3>
        <div className="mt-5 space-y-4">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900"
            >
              <p>{item.message}</p>
              <span className="text-sm text-slate-500">{item.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
