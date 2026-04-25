import { Clock3, Save } from "lucide-react";
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
  const isShort = activeQuestion?.type === "short-text";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="sticky top-[73px] z-20 glass-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-brand-600">{activeQuestion?.sectionTitle}</p>
            <h2 className="mt-1 text-2xl font-semibold">Phase 1 Deep Assessment</h2>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-brand-600" />
                {progress.estimatedMinutesLeft} min left
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4 text-accent-500" />
                Last saved {formatDateTime(progress.lastSavedAt)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar value={completion} />
          <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
            <span>{Math.round(completion)}% complete</span>
            <span>Calm writing mode with autosave enabled</span>
          </div>
        </div>
      </div>

      {activeQuestion ? (
        <div className="grid gap-6 lg:items-start lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="glass-card h-fit self-start p-4 md:p-5 lg:sticky lg:top-[228px]">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Question Navigator
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  Jump between prompts
                </h3>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                {questions.length} total
              </div>
            </div>

            <div className="mt-4 max-h-[calc(100vh-280px)] space-y-5 overflow-y-auto pr-1">
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
                  <div className="grid grid-cols-5 gap-2">
                    {group.questions.map((question) => {
                      const isActive = question.index === currentIndex;
                      const hasAnswer = Boolean(form.watch(question.id));

                      return (
                        <button
                          key={question.id}
                          type="button"
                          onClick={() => setCurrentIndex(question.index)}
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
          </aside>

          <form className="glass-card space-y-8 p-6 md:p-10">
            <div className="space-y-4">
              <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                {activeQuestion.type.replace("-", " ")}
              </div>
              <h3 className="max-w-4xl text-3xl font-semibold leading-tight md:text-4xl">
                {activeQuestion.label}
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                Respond in your own words. Specific detail, context and honest reflection all improve the final personalized report.
              </p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white/80 p-4 shadow-inner shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-slate-950/20 md:p-6">
              {isShort ? (
                <input
                  type="text"
                  placeholder={activeQuestion.placeholder}
                  className="w-full border-0 bg-transparent px-2 py-3 text-lg outline-none placeholder:text-slate-400"
                  {...form.register(activeQuestion.id, {
                    required: activeQuestion.required
                      ? "This answer is required before moving on."
                      : false,
                  })}
                />
              ) : (
                <textarea
                  placeholder={activeQuestion.placeholder}
                  className="min-h-[360px] w-full resize-none border-0 bg-transparent px-2 py-3 text-lg leading-8 outline-none placeholder:text-slate-400"
                  {...form.register(activeQuestion.id, {
                    required: activeQuestion.required
                      ? "This answer is required before moving on."
                      : false,
                  })}
                />
              )}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800">
                <span>{activeQuestion.required ? "Required question" : "Optional question"}</span>
                <span>{String(answerValue).length} characters</span>
              </div>
            </div>

            {form.formState.errors[activeQuestion.id] ? (
              <p className="text-sm text-rose-500">
                {form.formState.errors[activeQuestion.id]?.message}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setCurrentIndex((value) => Math.max(value - 1, 0))}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => notify("Progress saved. You can exit and return later.")}
                >
                  Save & Exit
                </Button>
                <Button
                  type="button"
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
        </div>
      ) : null}
    </div>
  );
}
