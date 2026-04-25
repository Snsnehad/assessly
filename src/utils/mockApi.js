import axios from "axios";
import { finalReport } from "../data/finalReport";
import { questionnaire, questionnaireQuestions } from "../data/questionnaire";
import { userProgress } from "../data/userProgress";
import { users } from "../data/users";

const api = axios.create({
  baseURL: "/mock-api",
  timeout: 800,
});

const delay = (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ data }), 500);
  });

export const mockApi = {
  client: api,
  getCurrentUser: async () => delay(users[0]),
  getUsers: async () => delay(users),
  getQuestionnaire: async () => delay(questionnaire),
  getQuestions: async () => delay(questionnaireQuestions),
  getUserProgress: async () => delay(userProgress),
  getFinalReport: async () => delay(finalReport),
  getAdminOverview: async () =>
    delay({
      totalUsers: 1248,
      inProgressUsers: 386,
      completedAssessments: 742,
      reportGeneratedCount: 718,
      progressTrend: [
        { week: "W1", inProgress: 312, completed: 584 },
        { week: "W2", inProgress: 330, completed: 621 },
        { week: "W3", inProgress: 358, completed: 680 },
        { week: "W4", inProgress: 386, completed: 742 },
      ],
      sectionCompletion: questionnaire.sections.map((section, index) => ({
        name: section.title.split(" ")[0],
        value: [78, 71, 69, 66, 64, 58, 55, 52][index],
      })),
      recentActivity: [
        { id: 1, message: "Aarav Sharma saved question 43 in Financial Thinking", time: "18 min ago" },
        { id: 2, message: "Maya Chen completed the Phase 1 assessment", time: "2 h ago" },
        { id: 3, message: "Admin manually generated a final report for user #204", time: "Today" },
      ],
    }),
};
