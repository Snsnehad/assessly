import { ListChecks, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
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

  const remainingCount = Math.max(questions.length - currentIndex, 0);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#eef3f9] dark:bg-black">
      <section className="relative border-b border-slate-200 bg-white px-5 pt-4 dark:border-white/10 dark:bg-[#07111f] sm:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#07111f] dark:text-white">
              {activeQuestion?.sectionTitle}
            </h1>
            <p className="mt-0.5 text-xs font-medium text-[#6f86ad] dark:text-[#8fa0bc]">
              Investor Risk Assessment
            </p>
          </div>

          <div className="flex items-end gap-7 text-right">
            <button
              type="button"
              onClick={() => setNavigatorOpen((open) => !open)}
              className="group text-left"
              aria-expanded={navigatorOpen}
            >
              <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-[#7b8dab] dark:text-[#8fa0bc]">
                Question
              </span>
              <span className="mt-0.5 flex items-center gap-2 font-mono text-base font-bold text-[#07111f] dark:text-white">
                {currentIndex + 1} / {questions.length}
                <ListChecks className="h-4 w-4 text-[#9aa7c0] transition group-hover:text-[#2563eb]" />
              </span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
            <div>
              <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-[#7b8dab] dark:text-[#8fa0bc]">
                Saved
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-[#324763] dark:text-[#d9e6f8]">
                {formatDateTime(progress.lastSavedAt)}
              </span>
            </div>
          </div>
        </div>

        {navigatorOpen ? (
          <div className="absolute right-5 top-[calc(100%+12px)] z-30 w-[min(520px,calc(100vw-40px))] rounded-lg border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-[#0b1626] dark:shadow-black/40">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-[#8fa0bc]">
                  Question Navigator
                </p>
                <h3 className="mt-2 text-base font-semibold text-[#07111f] dark:text-white">
                  Jump between prompts
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNavigatorOpen(false)}
                className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10"
                aria-label="Close question navigator"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 max-h-[min(520px,calc(100vh-260px))] space-y-5 overflow-y-auto pr-1">
              {questionGroups.map((group) => (
                <div key={group.title} className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-[#07111f] dark:text-white">{group.title}</p>
                    <span className="text-xs text-slate-500 dark:text-[#8fa0bc]">
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
                            "flex h-10 items-center justify-center rounded-lg border text-xs font-semibold transition-all",
                            isActive
                              ? "border-[#2563eb] bg-[#2563eb] text-white shadow-lg shadow-blue-500/20"
                              : hasAnswer
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-[#07111f] dark:text-[#aebdd2] dark:hover:border-white/20 dark:hover:bg-[#101e32]",
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

        <div className="mt-4 h-1 w-full bg-[#e3e9f3] dark:bg-white/10">
          <div
            className="h-full bg-[#2563eb] transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
        <div className="absolute bottom-[-1px] right-7 translate-y-full text-xs font-bold text-[#2563eb]">
          {Math.round(completion)}%
        </div>
      </section>

      {activeQuestion ? (
        <form className="mx-auto mt-8 flex min-h-[calc(100vh-14rem)] w-[calc(100%-2.5rem)] max-w-[1200px] flex-col rounded-2xl border border-[#dbe3ee] bg-white px-6 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#07111f] dark:shadow-[0_18px_45px_rgba(0,0,0,0.45)] sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-7 items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 font-mono text-xs font-bold text-[#2563eb] dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-300">
                Q {currentIndex + 1}
              </span>
              <span className="text-xs font-medium text-[#5c6f8d] dark:text-[#aebdd2]">Select one answer</span>
            </div>
            <span className="font-mono text-xs text-[#8fa0bc] dark:text-[#8fa0bc]">{remainingCount} remaining</span>
          </div>

          <div className="mt-2">
            <h2 className="max-w-full text-[20px] font-semibold leading-[1.45] tracking-tight text-[#07111f] dark:text-white">
              {activeQuestion.label}
            </h2>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {activeQuestion.choices.map((choice, index) => {
              const selected = answerValue === choice.value;
              const letter = String.fromCharCode(65 + index);

              return (
                <label
                  key={choice.id}
                  className={[
                    "flex min-h-[74px] cursor-pointer items-center gap-4 rounded-[14px] border px-5 transition-all",
                    selected
                      ? "border-[#2563eb] bg-[#eef5ff] shadow-[0_0_0_1px_#2563eb] dark:border-blue-400 dark:bg-blue-500/15 dark:shadow-[0_0_0_1px_rgba(96,165,250,0.8)]"
                      : "border-[#dbe3ee] bg-white hover:border-[#a9c4ef] hover:bg-[#fbfdff] dark:border-white/10 dark:bg-[#0b1626] dark:hover:border-blue-400/50 dark:hover:bg-[#101e32]",
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
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
                      selected
                        ? "border-[#2563eb] bg-[#2563eb] text-white"
                        : "border-[#dbe3ee] bg-[#f8fafc] text-[#6b7d95] dark:border-white/10 dark:bg-[#101e32] dark:text-[#aebdd2]",
                    ].join(" ")}
                  >
                    {letter}
                  </span>
                  <span
                    className={[
                      "min-w-0 flex-1 text-base font-medium leading-7",
                      selected ? "text-[#0b46bd] dark:text-blue-200" : "text-[#07111f] dark:text-slate-100",
                    ].join(" ")}
                  >
                    {choice.label}
                  </span>
                  <span
                    className={[
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      selected ? "border-[#2563eb] bg-[#2563eb] dark:border-blue-300 dark:bg-blue-400" : "border-[#c7d3e3] dark:border-[#40516a]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                  </span>
                </label>
              );
            })}
          </div>

          {form.formState.errors[activeQuestion.id] ? (
            <p className="mt-3 text-sm text-rose-500">
              {form.formState.errors[activeQuestion.id]?.message}
            </p>
          ) : null}

          <div className="mt-auto border-t border-[#dbe3ee] pt-7 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs">
                <span className="text-[#8fa0bc] dark:text-[#aebdd2]">
                  {activeQuestion.required ? "Required" : "Optional"}
                </span>
                <span className="flex items-center gap-2 font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {answerValue ? "Answer selected" : "No answer selected"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-11 rounded-lg border border-[#dbe3ee] bg-white px-6 text-sm font-medium text-[#39506f] shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-[#0b1626] dark:text-slate-100 dark:hover:bg-[#101e32]"
                  onClick={() => setCurrentIndex((value) => Math.max(value - 1, 0))}
                  disabled={currentIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-11 rounded-lg px-4 text-sm font-medium text-[#8fa0bc] hover:bg-transparent hover:text-[#5c6f8d] dark:hover:text-white"
                  onClick={() => notify("Progress saved. You can exit and return later.")}
                >
                  Save & exit
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="h-11 rounded-lg bg-[#2563eb] px-8 text-sm font-semibold shadow-none hover:bg-[#1d4ed8]"
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
                  {currentIndex === questions.length - 1 ? "Complete" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}
