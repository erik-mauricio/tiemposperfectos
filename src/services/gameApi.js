import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function fetchConjugations({ tense, difficulty, numberQuestions }) {
  const response = await api.get("/conjugations", {
    params: { tense, difficulty, numberQuestions },
  });
  return response.data;
}

export async function fetchSpeechPrompt({ difficulty, topic }) {
  const response = await api.get("/speech-prompt", {
    params: { difficulty, topic },
  });
  return response.data;
}

export async function fetchReading({ difficulty, topic, q, numberQuestions }) {
  const response = await api.get("/reading", {
    params: { difficulty, topic, q, numberQuestions },
  });
  return response.data;
}
