import { Clock3, FileCheck2, PenSquare, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import StatsCard from "../../components/StatsCard";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useFetch } from "../../hooks/useFetch";
import { mockApi } from "../../utils/mockApi";
import { formatDateTime } from "../../utils/formatters";

export default function UserDashboardPage() {
  const { user } = useAuth();
  const progressState = useFetch(() => mockApi.getUserProgress(), []);

  if (progressState.loading) {
    return <div className="glass-card p-6">Loading your assessment workspace...</div>;
  }

  const progress = progressState.data;
  const percent = Math.round(
    (progress.completedQuestions / progress.totalQuestions) * 100
  );

  const stats = [
    { icon: PenSquare, label: "Assessment Status", value: progress.status, change: `${percent}% complete` },
    { icon: Clock3, label: "Last Saved", value: formatDateTime(progress.lastSavedAt), change: "Autosave enabled" },
    { icon: FileCheck2, label: "Report Status", value: progress.reportStatus.includes("Pending") ? "Pending" : "Available", change: "One final report" },
    { icon: UserCircle2, label: "Profile Completion", value: `${progress.profileCompletion}%`, change: "Personal context" },
  ];

  return (
    <div className="space-y-6">
      <section className="glass-card grid gap-6 overflow-hidden p-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="text-sm text-brand-600">Welcome back</p>
          <h2 className="mt-2 text-3xl font-semibold">
            {user?.name}, continue your deep written assessment.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
            This platform is built around one premium self-assessment experience. Continue writing where you left off and unlock your personalized final report once every stage is complete.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/assessment">
              <Button>Continue assessment</Button>
            </Link>
            <Link to="/report">
              <Button variant="secondary">View final report</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-[28px] bg-slate-50 p-5 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span>Assessment status</span>
            <span className="font-semibold text-brand-600">{progress.status}</span>
          </div>
          <ProgressBar value={percent} />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>{percent}% complete</span>
            <span>Question {progress.completedQuestions} of {progress.totalQuestions}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white p-4 dark:bg-slate-800">
              <p className="text-slate-500">Last saved</p>
              <p className="mt-1 font-semibold">{formatDateTime(progress.lastSavedAt)}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 dark:bg-slate-800">
              <p className="text-slate-500">Estimated time left</p>
              <p className="mt-1 font-semibold">{progress.estimatedMinutesLeft} min</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.label}
            {...stat}
            tone={index % 2 === 0 ? "brand" : "emerald"}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="glass-card p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Assessment snapshot</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A focused view of your single assessment journey.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 p-5 dark:border-slate-800">
              <p className="text-sm text-slate-500">Current section</p>
              <p className="mt-2 text-xl font-semibold">{progress.activeSection}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                One question at a time, designed for thoughtful written responses.
              </p>
            </div>
            <div className="rounded-[28px] border border-slate-200 p-5 dark:border-slate-800">
              <p className="text-sm text-slate-500">Report availability</p>
              <p className="mt-2 text-xl font-semibold">{progress.reportStatus}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                You receive one final personalized report per completed attempt.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold">Next steps</h3>
          <div className="mt-5 space-y-4">
            {[
              "Continue writing from your last saved question",
              "Complete all sections to unlock the final report",
              "Keep your profile details accurate for better context",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-900"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
