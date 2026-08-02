import { useEffect, useState } from "react";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Controls from "../components/Controls.jsx";
import WelcomeText from "../components/WelcomeText.jsx";
import Score from "../components/Score.jsx";
import Skeleton from "../components/Skeleton.jsx";
import Instructions from "../components/Instructions.jsx";
import { Button } from "@/components/ui/button";
import { CONTROL_CONFIG } from "../constants/controlConfig";
import { useGameControls } from "../hooks/useGameControls";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GrammarPage() {
  const [conjugations, setConjugations] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [booleanResponses, setBooleanResponses] = useState([]);
  const [settings, setSettings] = useState({
    difficulty: "",
    numQs: "",
    tense: "",
  });
  const [score, setScore] = useState(0);
  const [isSiteLoading, setIsSiteLoading] = useState(false);
  const { t } = useLanguage();

  const controlConfig = CONTROL_CONFIG.grammar;

  const {
    difficulty,
    numQuestions,
    tense,
    setDifficulty,
    setNumQuestions,
    setTense,
    handleGenerate,
  } = useGameControls({
    gameType: "grammar",
    onConjugations: setConjugations,
    onGameSettings: setSettings,
    onSiteLoading: setIsSiteLoading,
  });

  const fieldValues = { tense };
  const fieldSetters = { tense: setTense };
  const fields = controlConfig.fields.map((field) => ({
    ...field,
    value: fieldValues[field.key],
    onChange: fieldSetters[field.key],
  }));

  const correctAnswers = conjugations.map((item) => item.answer);

  const splitSentence = (sentence) => sentence.split("_____");

  const checkResponses = () => {
    const results = [];
    for (const [key, value] of Object.entries(userAnswers)) {
      results.push(correctAnswers[key] === value);
    }
    setBooleanResponses(results);

    const totalQs = conjugations.length;
    let count = 0;
    for (let index = 0; index < conjugations.length; index += 1) {
      if (results[index]) {
        count += 1;
      }
    }

    const total = (count / totalQs) * 100;
    setScore(total);
  };

  useEffect(() => {
    setBooleanResponses([]);
    setUserAnswers({});
    setScore(0);
  }, [conjugations]);

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
            heading="Grammar Practice"
            text="Use the panel on the left to choose how tough you want your exercises to be — Beginner, Intermediate, or Advanced — and pick a tense and number of questions. We'll generate fill-in-the-blank conjugation exercises tailored to your settings."
          />

          {conjugations?.length > 0 && (
            <Score gameType="grammar" scoreColor="var(--primary)" settings={settings} score={score} />
          )}

          <Instructions title="Fill in the Blanks" titleColor="var(--primary)">
            {isSiteLoading && <Skeleton />}
            {conjugations?.length > 0 &&
              conjugations.map((question, index) => (
                <div className="p-3" key={index}>
                  <h3 className="text-primary font-bold text-lg">
                    {t.common.exercise} {index + 1}
                  </h3>
                  <div
                    className="rounded-2xl bg-muted/60 border-2 p-4 hover:border-primary transition-colors"
                    style={{
                      borderColor:
                        booleanResponses[index] && booleanResponses?.length > 0
                          ? "var(--success)"
                          : "var(--border)",
                    }}
                  >
                    <label>
                      {splitSentence(question.sentence)[0]}
                      <input
                        type="text"
                        className="border-2 border-primary rounded-lg px-2 py-0.5 mx-1 bg-background"
                        value={userAnswers[index] ?? ""}
                        onChange={(event) =>
                          setUserAnswers({
                            ...userAnswers,
                            [index]: event.target.value,
                          })
                        }
                      />
                      {splitSentence(question.sentence)[1]}
                    </label>
                    <p className="border-t mt-2 pt-2 max-w-100 text-sm">
                      <em className="font-bold not-italic">{t.common.translation}:</em>{" "}
                      {question.translation}
                    </p>
                  </div>
                </div>
              ))}
            <div className="text-center">
              {conjugations?.length > 0 && (
                <Button
                  type="button"
                  onClick={checkResponses}
                  className="rounded-full w-[250px] mb-3 bg-success text-success-foreground hover:bg-success/90"
                >
                  {t.common.submitAll}
                </Button>
              )}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Question&apos;s content was generated by ChatGPT.
            </p>
          </Instructions>
        </div>
      </div>
    </>
  );
}
