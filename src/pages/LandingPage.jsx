import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Lock,
  PenSquare,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const valueProps = [
  {
    icon: PenSquare,
    title: "One premium deep assessment",
    text: "A single structured writing journey designed for meaningful introspection rather than surface-level scoring.",
  },
  {
    icon: FileSearch,
    title: "Personalized intelligence report",
    text: "Receive one detailed final report covering patterns, strengths, growth areas and recommendations.",
  },
  {
    icon: Lock,
    title: "Confidential and secure",
    text: "Built for honest reflection with calm UX, private responses and a trusted premium feel.",
  },
];

const testimonials = [
  {
    name: "Lena Brooks",
    role: "People Ops Lead",
    quote:
      "The written format created a completely different quality of insight. It felt thoughtful, premium and deeply personal.",
  },
  {
    name: "Ishaan Verma",
    role: "Founder",
    quote:
      "This no longer feels like a quiz. It feels like a guided self-assessment experience people want to take seriously.",
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <header className="page-shell py-6">
        <div className="glass-card flex items-center justify-between px-5 py-4">
          <Link to="/" className="text-xl font-semibold">
            Assessly
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Login
            </Link>
            <Link to="/signup">
              <Button size="sm">Start Assessment</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="page-shell relative pb-16 pt-10 lg:pb-24">
        <div className="absolute left-10 top-0 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute right-10 top-24 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/90 px-4 py-2 text-sm text-brand-700 shadow-soft dark:border-brand-500/20 dark:bg-slate-900/70 dark:text-brand-200">
              <Sparkles className="h-4 w-4" />
              Premium deep self-assessment platform
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-6xl">
              Guided written questions that turn reflection into meaningful insight.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Sign up, move through one carefully designed deep assessment, save your progress at any time, and receive one AI-backed personalized intelligence report.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Begin Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/assessment">
                <Button variant="secondary" size="lg">
                  Explore Demo
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {["AI-backed analysis", "Confidential by design", "Save progress anytime"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent-500" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-[32px] p-6"
          >
            <div className="rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-brand-700 p-6 text-white">
              <p className="text-sm text-white/70">Report Preview</p>
              <p className="mt-2 text-3xl font-semibold">Behavioral Intelligence Summary</p>
              <p className="mt-4 max-w-sm text-sm text-white/75">
                You show strong reflective depth, thoughtful future orientation and a careful relationship with risk.
              </p>
              <div className="mt-6 rounded-3xl bg-white/10 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span>Insight richness</span>
                  <span>High</span>
                </div>
                <div className="h-3 rounded-full bg-white/15">
                  <div className="h-3 w-[84%] rounded-full bg-accent-400" />
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="text-sm text-slate-500">Assessment depth</p>
                <p className="mt-2 text-2xl font-semibold">200 prompts</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="text-sm text-slate-500">Final output</p>
                <p className="mt-2 text-2xl font-semibold">1 report</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-semibold">One guided path from reflection to insight</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["1", "Write thoughtfully", "Move through one question at a time in a calm, focused writing experience."],
            ["2", "Build depth", "Long-form answers capture context, patterns and emotional nuance."],
            ["3", "Receive your report", "Unlock one detailed personalized report when all stages are complete."],
          ].map(([step, title, text]) => (
            <div key={title} className="glass-card p-6">
              <div className="mb-4 text-sm font-semibold text-brand-600">Step {step}</div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
            Why Written Answers Matter
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Better writing creates better analysis</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Paragraph responses reveal context, internal conflict, emotional tone and decision logic. That depth creates a report that actually feels personal.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((feature) => (
            <div key={feature.title} className="glass-card p-6">
              <div className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/10">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="glass-card grid gap-8 p-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
              Report Preview
            </p>
            <h2 className="mt-3 text-3xl font-semibold">One final report with practical self-understanding</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              The final report combines written-response analysis, behavior patterns, strength areas, growth areas, trait graphs and recommendations into one cohesive document.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-6 dark:bg-slate-900">
            <div className="space-y-4">
              {["Personalized summary", "Behaviour patterns", "Trait graphs", "Actionable recommendations"].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-4 dark:bg-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <div key={item.name} className="glass-card p-6">
              <p className="text-lg leading-8 text-slate-700 dark:text-slate-200">
                "{item.quote}"
              </p>
              <div className="mt-6">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="glass-card grid gap-6 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Premium pricing</h2>
            <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
              One product, one assessment, one detailed report. Pricing can stay simple because the product experience is singular and focused.
            </p>
          </div>
          <Link to="/signup">
            <Button variant="emerald" size="lg">
              Start your assessment
            </Button>
          </Link>
        </div>
      </section>

      <section className="page-shell py-10">
        <div className="glass-card grid gap-6 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Ready to understand yourself more clearly?</h2>
            <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
              Begin the guided writing journey and unlock your personalized intelligence report.
            </p>
          </div>
          <Link to="/signup">
            <Button size="lg">Create account</Button>
          </Link>
        </div>
      </section>

      <footer className="page-shell pb-10 pt-4">
        <div className="flex flex-col gap-3 border-t border-slate-200 py-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Assessly © 2026. Premium assessment frontend demo.</p>
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
