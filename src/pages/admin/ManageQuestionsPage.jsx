import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Table from "../../components/Table";
import { questionnaire, questionnaireQuestions } from "../../data/questionnaire";
import { useToast } from "../../hooks/useToast.jsx";

export default function ManageQuestionsPage() {
  const { notify } = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return questionnaireQuestions.filter((question) => {
      const matchesSearch = question.label.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || question.sectionTitle === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, search]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[220px] flex-1">
            <InputField label="Search questions" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-full max-w-xs">
            <SelectField label="Filter section" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All sections</option>
              {questionnaire.sections.map((section) => (
                <option key={section.id} value={section.title}>
                  {section.title}
                </option>
              ))}
            </SelectField>
          </div>
          <Button onClick={() => notify("Question form placeholder opened.")}>Add Question</Button>
        </div>
      </div>

      <Table
        columns={["Question", "Type", "Section", "Required", "Actions"]}
        data={filtered.slice(0, 12)}
        renderRow={(question) => (
          <tr key={question.id}>
            <td className="px-5 py-4">{question.label}</td>
            <td className="px-5 py-4 capitalize">{question.type.replace("-", " ")}</td>
            <td className="px-5 py-4">{question.sectionTitle}</td>
            <td className="px-5 py-4">{question.required ? "Required" : "Optional"}</td>
            <td className="px-5 py-4">
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => notify(`Edit ${question.id} placeholder`)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => notify(`Move ${question.id} up placeholder`)}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => notify(`Move ${question.id} down placeholder`)}>
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => notify(`Delete ${question.id} placeholder`)}>
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
