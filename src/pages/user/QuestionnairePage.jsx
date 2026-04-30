import { Clock3, ListChecks, Save, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import { useFetch } from "../../hooks/useFetch";
import { useToast } from "../../hooks/useToast.jsx";
import { mockApi } from "../../utils/mockApi";
import { formatDateTime } from "../../utils/formatters";

export default function QuestionnairePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const saveTimerRef = useRef(null);
  const { notify } = useToast();
  const questionsState = useFetch(() => mockApi.getQuestions(), []);
  const progressState = useFetch(() => mockApi.getUserProgress(), []);
  const form = useForm();

  const questions = questionsState.data || [];
  const progress = progressState.data;
  const activeQuestion = questions[currentIndex];
  const completion = useMemo(
    () => ((currentIndex + 1) / Math.max(questions.length, 1)) * 100,
    [currentIndex, questions.length]
  );
  const questionGroups = useMemo(() => {
    return questions.reduce((groups, question, index) => {
      const existingGroup = groups.find((group) => group.title === question.sectionTitle);

      if (existingGroup) {
        existingGroup.questions.push({ ...question, index });
        return groups;
      }

      groups.push({
        title: question.sectionTitle,
        questions: [{ ...question, index }],
      });
      return groups;
    }, []);
  }, [questions]);

  useEffect(() => {
    if (!progress) {
      return;
    }

    setCurrentIndex(Math.max(progress.completedQuestions - 1, 0));
    Object.entries(progress.answers).forEach(([key, value]) => {
      form.setValue(key, value);
    });
  }, [form, progress]);

  useEffect(() => {
    const subscription = form.watch(() => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = window.setTimeout(() => notify("Draft auto-saved"), 700);
    });

    return () => {
      subscription.unsubscribe();
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [form, notify]);

  if (questionsState.loading || progressState.loading) {
    return <div className="glass-card p-6">Loading your assessment...</div>;
  }

  const answerValue = activeQuestion ? form.watch(activeQuestion.id) || "" : "";

  return (
    <div className="w-full space-y-4">
      <div className="sticky top-[121px] z-20 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 md:top-[73px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-brand-600">{activeQuestion?.sectionTitle}</p>
            <h2 className="mt-0.5 text-lg font-semibold">Phase 1 Assessment</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setNavigatorOpen((open) => !open)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 font-medium transition hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800"
              aria-expanded={navigatorOpen}
            >
              <ListChecks className="h-4 w-4 text-brand-600" />
              Question {currentIndex + 1} of {questions.length}
            </button>
            <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4 text-accent-500" />
                Saved {formatDateTime(progress.lastSavedAt)}
              </div>
            </div>
          </div>
        </div>
        {navigatorOpen ? (
          <div className="absolute left-4 right-4 top-[calc(100%+12px)] z-30 rounded-[28px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 md:left-auto md:w-[520px]">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Question Navigator
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  Jump between prompts
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNavigatorOpen(false)}
                className="rounded-2xl border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
                aria-label="Close question navigator"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 max-h-[min(520px,calc(100vh-260px))] space-y-5 overflow-y-auto pr-1">
              {questionGroups.map((group) => (
                <div key={group.title} className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {group.title}
                    </p>
                    <span className="text-xs text-slate-500">
                      {group.questions.length} questions
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
                    {group.questions.map((question) => {
                      const isActive = question.index === currentIndex;
                      const hasAnswer = Boolean(form.watch(question.id));

                      return (
                        <button
                          key={question.id}
                          type="button"
                          onClick={() => {
                            setCurrentIndex(question.index);
                            setNavigatorOpen(false);
                          }}
                          className={[
                            "flex h-11 items-center justify-center rounded-2xl border text-sm font-medium transition-all",
                            isActive
                              ? "border-brand-500 bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                              : hasAnswer
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900",
                          ].join(" ")}
                          aria-current={isActive ? "step" : undefined}
                          title={question.label}
                        >
                          {question.order}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-3">
          <ProgressBar value={completion} />
          <div className="mt-1.5 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
            <span>{Math.round(completion)}% complete</span>
            <span>Autosave enabled</span>
          </div>
        </div>
      </div>

      {activeQuestion ? (
        <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:p-6">
          <div className="max-w-5xl space-y-3">
            <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                Select one answer
            </div>
            <h3 className="text-xl font-semibold leading-snug text-slate-950 dark:text-white md:text-2xl">
              {activeQuestion.label}
            </h3>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
              Choose the option closest to your natural pattern.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {activeQuestion.choices.map((choice, index) => {
              const selected = answerValue === choice.value;
              const letter = String.fromCharCode(65 + index);

              return (
                <label
                  key={choice.id}
                  className={[
                    "flex min-h-20 cursor-pointer gap-3 rounded-2xl border p-4 transition-all",
                    selected
                      ? "border-brand-500 bg-brand-50 shadow-sm dark:bg-brand-500/10"
                      : "border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-900 dark:hover:bg-slate-900",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    value={choice.value}
                    className="sr-only"
                    {...form.register(activeQuestion.id, {
                      required: activeQuestion.required
                        ? "Please select one answer before moving on."
                        : false,
                    })}
                  />
                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold",
                      selected
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
                    ].join(" ")}
                  >
                    {letter}
                  </span>
                  <span className="text-sm font-medium leading-6 text-slate-800 dark:text-slate-100">
                    {choice.label}
                  </span>
                </label>
              );
            })}
            <div className="mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-800 md:col-span-2">
              <span>{activeQuestion.required ? "Required question" : "Optional question"}</span>
              <span>{answerValue ? "Answer selected" : "No answer selected"}</span>
            </div>
          </div>

          {form.formState.errors[activeQuestion.id] ? (
            <p className="mt-3 text-sm text-rose-500">
              {form.formState.errors[activeQuestion.id]?.message}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setCurrentIndex((value) => Math.max(value - 1, 0))}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => notify("Progress saved. You can exit and return later.")}
              >
                Save & Exit
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={async () => {
                  const valid = await form.trigger(activeQuestion.id);
                  if (!valid) {
                    return;
                  }

                  if (currentIndex < questions.length - 1) {
                    setCurrentIndex((value) => value + 1);
                    return;
                  }

                  notify("Assessment complete. Final report can now be generated.");
                }}
              >
                {currentIndex === questions.length - 1 ? "Complete assessment" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}
