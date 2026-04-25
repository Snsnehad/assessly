const sectionBlueprints = [
  {
    id: "personal-background",
    title: "Personal Background",
    description: "Context about your story, influences and lived experience.",
    promptPrefix:
      "Describe the life experiences, responsibilities or turning points that most shaped your current outlook",
  },
  {
    id: "financial-thinking",
    title: "Financial Thinking",
    description: "How you interpret security, opportunity, money and tradeoffs.",
    promptPrefix:
      "Explain how you usually think about money, security, opportunity and future stability in situations like",
  },
  {
    id: "risk-behaviour",
    title: "Risk Behaviour",
    description: "Your relationship with uncertainty, exposure and downside.",
    promptPrefix:
      "Reflect on how you respond when uncertainty rises and you need to choose a path involving risk such as",
  },
  {
    id: "emotional-patterns",
    title: "Emotional Patterns",
    description: "Emotional habits, internal triggers and recurring reactions.",
    promptPrefix:
      "Write about the emotional patterns you notice in yourself when facing pressure, disappointment or praise around",
  },
  {
    id: "decision-making",
    title: "Decision Making",
    description: "How you gather information, delay, commit and evaluate choices.",
    promptPrefix:
      "Walk through your decision-making process when the choice is important, ambiguous or irreversible, especially in relation to",
  },
  {
    id: "long-term-vision",
    title: "Long-Term Vision",
    description: "Future orientation, goals, identity and meaning.",
    promptPrefix:
      "Describe the future you are consciously building and what long-term success means to you in areas such as",
  },
  {
    id: "behavioural-biases",
    title: "Behavioural Biases",
    description: "Blind spots, assumptions and patterns that may distort judgment.",
    promptPrefix:
      "Identify the biases, assumptions or shortcuts that may affect your thinking when you are dealing with",
  },
  {
    id: "reflection-questions",
    title: "Reflection Questions",
    description: "Deep writing prompts intended to surface nuance and self-awareness.",
    promptPrefix:
      "Take time to reflect deeply and write honestly about what you are learning about yourself through questions connected to",
  },
];

const promptTopics = [
  "family expectations",
  "career decisions",
  "major financial commitments",
  "trust and collaboration",
  "personal setbacks",
  "leadership moments",
  "uncertain transitions",
  "conflict resolution",
  "self-worth and achievement",
  "planning for the future",
  "emotional recovery",
  "patterns you want to change",
  "times you felt most decisive",
  "fear of loss",
  "growth and reinvention",
  "relationships and responsibility",
  "protecting what matters",
  "ambition and restraint",
  "pressure from others",
  "regret and hindsight",
  "identity and belonging",
  "resilience after failure",
  "moments of clarity",
  "choosing between comfort and challenge",
  "what you want the next decade to represent",
];

function buildQuestions(section, sectionIndex) {
  return Array.from({ length: 25 }, (_, index) => {
    const order = sectionIndex * 25 + index + 1;
    const topic = promptTopics[index % promptTopics.length];
    const isShort = index % 7 === 0;
    const isParagraph = index % 5 === 0;

    return {
      id: `q-${order}`,
      order,
      sectionId: section.id,
      sectionTitle: section.title,
      type: isShort ? "short-text" : isParagraph ? "paragraph-reflection" : "long-text",
      required: index % 6 !== 0,
      placeholder: isShort
        ? "Write a concise but meaningful response..."
        : "Write openly and in detail. The more context you share, the richer the final report can be.",
      label: `${section.promptPrefix} ${topic}.`,
    };
  });
}

export const questionnaire = {
  id: "phase-1-deep-assessment",
  title: "Phase 1 Deep Assessment",
  subtitle:
    "A single guided written assessment designed to surface patterns, blind spots and long-range insight.",
  totalQuestions: 200,
  sections: sectionBlueprints.map((section, index) => ({
    ...section,
    questions: buildQuestions(section, index),
  })),
};

export const questionnaireQuestions = questionnaire.sections.flatMap(
  (section) => section.questions
);
