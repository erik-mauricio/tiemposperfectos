export const CONTROL_CONFIG = {
  grammar: {
    title: "Grammar Setup",
    generateLabel: "New Questions",
    questionOptions: [5, 10, 15],
    fields: [
      {
        key: "tense",
        type: "select",
        label: "Grammar Tense",
        options: ["Presente", "Preterite", "Imperfecto", "Futuro", "Condicional"],
      },
    ],
  },
  reading: {
    title: "Reading Setup",
    generateLabel: "New Passage",
    questionOptions: [3, 5, 8],
    fields: [
      {
        key: "topic",
        type: "select",
        label: "Topic",
        options: ["Culture", "History", "People", "Science"],
      },
      { key: "searchText", type: "search", label: "Search" },
    ],
  },
  speech: {
    title: "Conversation Setup",
    generateLabel: "New Prompt",
    fields: [
      {
        key: "topic",
        type: "select",
        label: "Conversation Type",
        options: [
          "Presentation Formal speech",
          "Casual conversation",
          "Storytelling",
          "Debate/Argument",
          "Interview responses",
          "Impromptu speaking",
        ],
      },
    ],
  },
};
