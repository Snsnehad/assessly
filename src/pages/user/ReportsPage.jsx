import { Download } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import { useFetch } from "../../hooks/useFetch";
import { useToast } from "../../hooks/useToast.jsx";
import { mockApi } from "../../utils/mockApi";
import { formatDate } from "../../utils/formatters";

export default function ReportsPage() {
  const { notify } = useToast();
  const reportState = useFetch(() => mockApi.getFinalReport(), []);

  if (reportState.loading) {
    return <div className="glass-card p-6">Loading final report...</div>;
  }

  if (!reportState.data) {
    return (
      <EmptyState
        title="Final report not ready yet"
        description="Complete the full written assessment to unlock your personalized report."
      />
    );
  }

  const report = reportState.data;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-brand-600">Final personalized report</p>
            <h2 className="mt-2 text-3xl font-semibold">Behavioral Intelligence Report</h2>
            <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-400">
              {report.summary}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-900">
            Generated {formatDate(report.generatedAt)}
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => notify("Mock PDF download started.")}
          >
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Status", report.status],
          ["Strength Areas", report.strengths.length],
          ["Growth Areas", report.growthAreas.length],
        ].map(([label, value]) => (
          <div key={label} className="glass-card p-6">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card h-[360px] p-6">
          <h3 className="mb-4 text-xl font-semibold">Trait graph</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={report.traitScores}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.35} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card h-[360px] p-6">
          <h3 className="mb-4 text-xl font-semibold">Trait intensity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={report.traitScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.15} />
              <XAxis dataKey="subject" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold">Strength areas</h3>
          <div className="mt-5 space-y-3">
            {report.strengths.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold">Growth areas</h3>
          <div className="mt-5 space-y-3">
            {report.growthAreas.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold">Behaviour patterns</h3>
          <div className="mt-5 space-y-3">
            {report.behaviourPatterns.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold">Recommendations</h3>
          <div className="mt-5 space-y-3">
            {report.recommendations.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
