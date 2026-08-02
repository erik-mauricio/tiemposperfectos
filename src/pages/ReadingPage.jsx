import { useEffect, useMemo, useState } from "react";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Controls from "../components/Controls.jsx";
import WelcomeText from "../components/WelcomeText.jsx";
import Instructions from "../components/Instructions.jsx";
import Score from "../components/Score.jsx";
import Error from "../components/Error.jsx";
import { Button } from "@/components/ui/button";
import { CONTROL_CONFIG } from "../constants/controlConfig";
import { useGameControls } from "../hooks/useGameControls";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ReadingPage() {
  const [readingData, setReadingData] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [booleanResponses, setBooleanResponses] = useState([]);
  const [score, setScore] = useState(0);
  const [settings, setSettings] = useState({});
  const [isSiteError, setIsSiteError] = useState(false);
  const { t } = useLanguage();

  const controlConfig = CONTROL_CONFIG.reading;

  const {
    difficulty,
    numQuestions,
    topic,
    searchText,
    setDifficulty,
    setNumQuestions,
    setTopic,
    setSearchText,
    handleGenerate,
  } = useGameControls({
    gameType: "reading",
    onReading: setReadingData,
    onGameSettings: setSettings,
    onSiteError: setIsSiteError,
  });

  const fieldValues = { topic, searchText };
  const fieldSetters = { topic: setTopic, searchText: setSearchText };
  const fields = controlConfig.fields.map((field) => ({
    ...field,
    value: fieldValues[field.key],
    onChange: fieldSetters[field.key],
  }));

  const correctAnswers = useMemo(() => {
    if (!readingData || !readingData.questions?.length) {
      return {};
    }

    return {
      ...readingData.questions.map((item) => item.correct),
    };
  }, [readingData]);

  const checkResponses = () => {
    if (readingData.questions?.length === 0) {
      setScore(0);
      return;
    }

    const results = [];
    for (const [key, value] of Object.entries(userAnswers)) {
      results.push(correctAnswers[key] === value);
    }
    setBooleanResponses(results);

    const totalQs = readingData.questions?.length;
    const count = results.filter(Boolean).length;
    setScore((count / totalQs) * 100);
  };

  useEffect(() => {
    setBooleanResponses([]);
    setUserAnswers({});
    setScore(0);
  }, [readingData]);

  return (
    <>
      <NavigationMenu />

      <div className="flex gap-4 bg-muted min-h-screen">
        <Controls
          title={controlConfig.title}
          fields={fields}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          numQuestions={numQuestions}
          questionOptions={controlConfig.questionOptions}
          onNumQuestionsChange={setNumQuestions}
          generateLabel={controlConfig.generateLabel}
          onGenerate={handleGenerate}
        />

        <div className="space-y-4 mt-2 p-4 w-full max-w-7xl mx-auto">
          <WelcomeText
            heading="Reading Comprehension"
            text="Use the panel on the left to choose how tough you want your passage to be — Beginner, Intermediate, or Advanced — and pick how many questions you're ready to tackle. We'll generate a unique reading passage along with comprehension questions to test your skills."
          />

          <Score settings={settings} scoreColor="var(--accent-foreground)" score={score} />

          <Instructions
            title="Reading Passage"
            text={readingData != null ? readingData.content : ""}
            textTitle={readingData != null ? readingData.title : ""}
            titleColor="var(--accent-foreground)"
          >
            {isSiteError ? (
              <Error />
            ) : (
              readingData?.questions?.length > 0 && (
                <>
                  {readingData.questions.map((question, index) => (
                    <div
                      className="p-4 bg-background border-2 rounded-2xl m-2"
                      style={{
                        borderColor:
                          booleanResponses[index] && booleanResponses?.length > 0
                            ? "var(--success)"
                            : "var(--border)",
                      }}
                      key={index}
                    >
                      <h2 className="font-bold text-xl mb-1">
                        {t.common.question} {index + 1}
                      </h2>

                      <p className="mb-4 text-base">{question.question}</p>

                      {Object.entries(question.options).map(([letter, optionText]) => (
                        <div className="flex-col mb-3" key={letter}>
                          <label className="flex items-center gap-2 border rounded-xl px-4 py-2.5 bg-muted/50 hover:border-accent-foreground cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={letter}
                              onChange={() =>
                                setUserAnswers({
                                  ...userAnswers,
                                  [index]: letter,
                                })
                              }
                            />
                            {` ${letter}. ${optionText}`}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )
            )}
            <div className="text-center">
              {readingData?.questions?.length > 0 && (
                <Button
                  type="button"
                  onClick={checkResponses}
                  className="rounded-full w-[250px] mb-3 bg-success text-success-foreground hover:bg-success/90"
                >
                  {t.common.submitAll}
                </Button>
              )}
            </div>
          </Instructions>
        </div>
      </div>
    </>
  );
}
