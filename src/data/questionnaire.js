const sectionBlueprints = [
  {
    id: "personal-background",
    title: "Personal Background",
    description: "Context about your story, influences and lived experience.",
    promptPrefix:
      "Which statement best describes how your life experiences shaped your outlook on",
  },
  {
    id: "financial-thinking",
    title: "Financial Thinking",
    description: "How you interpret security, opportunity, money and tradeoffs.",
    promptPrefix:
      "How do you usually think about money, security and opportunity when dealing with",
  },
  {
    id: "risk-behaviour",
    title: "Risk Behaviour",
    description: "Your relationship with uncertainty, exposure and downside.",
    promptPrefix:
      "What is your natural response when uncertainty rises around",
  },
  {
    id: "emotional-patterns",
    title: "Emotional Patterns",
    description: "Emotional habits, internal triggers and recurring reactions.",
    promptPrefix:
      "Which emotional pattern is most familiar to you when facing pressure around",
  },
  {
    id: "decision-making",
    title: "Decision Making",
    description: "How you gather information, delay, commit and evaluate choices.",
    promptPrefix:
      "How do you usually make important or ambiguous decisions related to",
  },
  {
    id: "long-term-vision",
    title: "Long-Term Vision",
    description: "Future orientation, goals, identity and meaning.",
    promptPrefix:
      "Which long-term vision feels closest to how you think about",
  },
  {
    id: "behavioural-biases",
    title: "Behavioural Biases",
    description: "Blind spots, assumptions and patterns that may distort judgment.",
    promptPrefix:
      "Which thinking pattern are you most likely to notice in yourself when dealing with",
  },
  {
    id: "reflection-questions",
    title: "Reflection Questions",
    description: "Reflective prompts intended to surface nuance and self-awareness.",
    promptPrefix:
      "What are you most likely learning about yourself through questions connected to",
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
    return {
      id: `q-${order}`,
      order,
      sectionId: section.id,
      sectionTitle: section.title,
      type: "single-choice",
      required: index % 6 !== 0,
      label: `${section.promptPrefix} ${topic}?`,
      choices: [
        {
          id: `q-${order}-a`,
          value: "steady-practical",
          label: "I choose the steady, practical option and protect stability first.",
        },
        {
          id: `q-${order}-b`,
          value: "reflective-balanced",
          label: "I pause, compare the tradeoffs and look for a balanced path.",
        },
        {
          id: `q-${order}-c`,
          value: "growth-oriented",
          label: "I lean toward growth, learning and the possibility of a better outcome.",
        },
        {
          id: `q-${order}-d`,
          value: "emotion-led",
          label: "My emotions and immediate sense of safety strongly guide my response.",
        },
      ],
    };
  });
}

export const questionnaire = {
  id: "phase-1-deep-assessment",
  title: "Phase 1 Deep Assessment",
  subtitle:
    "A single guided multiple-choice assessment designed to surface patterns, blind spots and long-range insight.",
  totalQuestions: 200,
  sections: sectionBlueprints.map((section, index) => ({
    ...section,
    questions: buildQuestions(section, index),
  })),
};

export const questionnaireQuestions = questionnaire.sections.flatMap(
  (section) => section.questions
);
