import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";
import {use, useState} from "react";
import {useEffect} from "react";
import Instructions from "../components/Instructions.jsx";
import Controls from "../components/Controls.jsx";
import PageCard from "../components/PageCard.jsx";
import WelcomeText from "../components/WelcomeText.jsx";
import Score from "../components/Score.jsx";


export default function GrammarPage() {
    const [conjugations, setConjugations] = useState([]);
    const [userAnswers, setUserAnswers] = useState({})
    const [booleanResponses, setBooleanResponses] = useState([])
    const [settings, setSettings] = useState({difficulty: "", numQs: "", tense: ""})
    const correctAnswers = { ...conjugations.map((item) => item.answer) };
    

    const splitSentence = (setence) => {
      const newSentence = setence.split("_____");
      return newSentence
    }



    const checkResponses = (responses) => {
      const results = []
      for (const [key, value] of Object.entries(userAnswers)) {
        results.push(correctAnswers[key] === value);
      }
      setBooleanResponses(results)
      const totalQs = readingData.questions?.length;
      let count = 0;
      for (let i = 0; i < conjugations.length; ++i) {
        if (booleanResponses[i]) {
          count += 1;
        }
      }
      setScore((count / totalQs) * 100);
      
    }

    return (
      <>
        <NavigationMenu />

        <div className="flex gap-4 bg-slate-300 ">
          <Controls
            gameType={"grammar"}
            conjugationsHandler={setConjugations}
            gameSettings={setSettings}
          />

          <div className="space-y-3 mt-2 p-4 w-full max-w-7xl mx-auto">
            <PageCard
              text={"Grammar Practice"}
              bgColor={"#e74d3ce3"}
              borderColor={"white"}
            ></PageCard>

            <WelcomeText
              heading={"Welcome to Reading Comphresion Practice"}
              text={`On this page, you get to take control of your learning. Use the
                panel on the left to choose how tough you want your passage to
                be — Beginner, Intermediate, or Advanced — and then pick how
                many questions you're ready to tackle (3, 5, or 8). Once you're
                set, we'll generate a unique reading passage just for you, along
                with comprehension questions to test your skills. It’s a fun,
                interactive way to boost your reading and critical thinking — so
                pick your settings and let’s get reading!`}
            ></WelcomeText>

            

            <Score  gameType={"grammar"}scoreColor={"#e74c3c"} settings={settings}></Score>
            

            <Instructions
              title="Fill in the Blanks"
              text="Use the panel on the left to choose how tough you want your
                  questions to be — Beginner, Intermediate, or Advanced — and
                  then pick how many questions you're ready to tackle (3, 5, or
                  8). Once you're set, we'll a set of Fill in the blanks
                  questions, where you will fill in the correct Spanish words or
                  phrases. Pay attention to verb conjugations, grammar rules,
                  and context clues."
              titleColor={"#e74c3c"}
            >
              {conjugations?.length > 0 &&
                conjugations.map((question, index) => (
                  <div className="p-3" key={index}>
                    <h3 className="text-[#e74c3c] font-bold text-xl">
                      Exercise {index + 1}
                    </h3>
                    <div
                      className="rounded-md bg-[#f8f9fa] border-2 border-[#e9ecef] p-4 hover:border-[#e74c3c]"
                      style={{
                        borderColor:
                          booleanResponses[index] &&
                          booleanResponses?.length > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      <label>
                        {splitSentence(question.sentence)[0]}
                        <input
                          type="text"
                          className="border-2 border-[#e74c3c] rounded-md"
                          value={userAnswers[index]}
                          onChange={(e) =>
                            setUserAnswers({
                              ...userAnswers,
                              [index]: e.target.value,
                            })
                          }
                        ></input>
                        {splitSentence(question.sentence)[1]}
                      </label>
                      <p className="border-t-2 mt-2 max-w-100">
                        <em className="font-bold text-normal">Translation:</em>{" "}
                        {question.translation}
                      </p>
                    </div>
                  </div>
                ))}
              <div className="text-center">
                <button
                  className="inline border-2 border-black bg-green-500 p-2 rounded-lg w-[250px] mb-3 text-white font-bold hover:bg-green-600"
                  onClick={() => checkResponses(userAnswers)}
                >
                  Submit All
                </button>
              </div>
            </Instructions>
          </div>
        </div>
      </>
    );


}