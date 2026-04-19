import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { fetchConjugations, fetchReading, fetchSpeechPrompt } from "../services/gameApi";

const DEFAULT_TOPIC_BY_GAME = {
  reading: "Culture",
  speech: "Presentation Formal speech",
};

export function useGameControls({
  gameType,
  onConjugations,
  onReading,
  onPrompt,
  onGameSettings,
  onSiteLoading,
  onSiteError,
}) {
  const [difficulty, setDifficulty] = useState("Beginner");
  const [numQuestions, setNumQuestions] = useState(5);
  const [tense, setTense] = useState("Presente");
  const [topic, setTopic] = useState(DEFAULT_TOPIC_BY_GAME[gameType] ?? "");
  const [searchText, setSearchText] = useState("");

  const [searchParam] = useDebounce(searchText, 700);

  const settings = useMemo(() => {
    if (gameType === "grammar") {
      return { difficulty, numQs: Number(numQuestions), tense };
    }

    if (gameType === "speech") {
      return { difficulty, topic };
    }

    return { difficulty, numQs: Number(numQuestions), topic };
  }, [difficulty, gameType, numQuestions, tense, topic]);

  useEffect(() => {
    onGameSettings?.(settings);
  }, [onGameSettings, settings]);

  useEffect(() => {
    setTopic(DEFAULT_TOPIC_BY_GAME[gameType] ?? "");
  }, [gameType]);

  const loadConjugations = useCallback(async () => {
    if (gameType !== "grammar") return;

    onSiteLoading?.(true);
    try {
      const data = await fetchConjugations({
        tense,
        difficulty,
        numberQuestions: Number(numQuestions),
      });
      onConjugations?.(data);
      onSiteError?.(false);
    } catch {
      onSiteError?.(true);
    } finally {
      onSiteLoading?.(false);
    }
  }, [difficulty, gameType, numQuestions, onConjugations, onSiteError, onSiteLoading, tense]);

  const loadSpeechPrompt = useCallback(async () => {
    if (gameType !== "speech") return;

    try {
      const data = await fetchSpeechPrompt({ difficulty, topic });
      onPrompt?.(data);
    } catch {
      onSiteError?.(true);
    }
  }, [difficulty, gameType, onPrompt, onSiteError, topic]);

  const loadReading = useCallback(async () => {
    if (gameType !== "reading") return;

    onSiteError?.(false);
    onSiteLoading?.(true);
    try {
      const data = await fetchReading({
        difficulty,
        topic,
        q: searchParam,
        numberQuestions: Number(numQuestions),
      });
      onReading?.(data);
    } catch {
      onSiteError?.(true);
    } finally {
      onSiteLoading?.(false);
    }
  }, [
    difficulty,
    gameType,
    numQuestions,
    onReading,
    onSiteError,
    onSiteLoading,
    searchParam,
    topic,
  ]);

  useEffect(() => {
    if (searchParam.trim() && gameType === "reading") {
      loadReading();
    }
  }, [gameType, loadReading, searchParam]);

  const handleGenerate = useCallback(() => {
    if (gameType === "grammar") {
      loadConjugations();
      return;
    }

    if (gameType === "speech") {
      loadSpeechPrompt();
      return;
    }

    loadReading();
  }, [gameType, loadConjugations, loadReading, loadSpeechPrompt]);

  return {
    difficulty,
    numQuestions,
    tense,
    topic,
    searchText,
    setDifficulty,
    setNumQuestions,
    setTense,
    setTopic,
    setSearchText,
    handleGenerate,
  };
}
