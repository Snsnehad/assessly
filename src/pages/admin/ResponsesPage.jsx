import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { questionnaireQuestions } from "../../data/questionnaire";
import { userProgress } from "../../data/userProgress";
import { users } from "../../data/users";
import { formatDateTime } from "../../utils/formatters";

export default function ResponsesPage() {
  const [selected, setSelected] = useState(null);

  const submissions = users
    .filter((user) => user.role === "user")
    .map((user, index) => ({
      id: `resp-${user.id}`,
      user: user.name,
      progress: `${user.completion}% complete`,
      savedAt: userProgress.lastSavedAt,
      answers: questionnaireQuestions.slice(index * 3, index * 3 + 3).map((question) => ({
        question: question.label,
        answer:
          userProgress.answers[question.id] ||
          "Sample long-form response placeholder showing the style of reflective written answers captured in the platform.",
      })),
    }));

  return (
    <div className="space-y-6">
      <Table
        columns={["User", "Progress", "Last Saved", "Actions"]}
        data={submissions}
        renderRow={(item) => (
          <tr key={item.id}>
            <td className="px-5 py-4">{item.user}</td>
            <td className="px-5 py-4">{item.progress}</td>
            <td className="px-5 py-4">{formatDateTime(item.savedAt)}</td>
            <td className="px-5 py-4">
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setSelected(item)}>
                  View answers
                </Button>
                <Button variant="ghost" size="sm">
                  Generate report
                </Button>
              </div>
            </td>
          </tr>
        )}
      />

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Written responses">
        <div className="space-y-4">
          {selected?.answers.map((item) => (
            <div key={item.question} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">
                {item.question}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-300">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
