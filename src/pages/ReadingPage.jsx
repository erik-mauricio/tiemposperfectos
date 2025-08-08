import NavigationMenu from "../components/NavigationMenu.jsx";
import {useState} from "react";
import Controls from "../components/Controls.jsx";
import PageCard from "../components/PageCard.jsx";
import WelcomeText from "../components/WelcomeText.jsx";
import Instructions from "../components/Instructions.jsx";
import Score from "../components/Score.jsx"
import { set } from "mongoose";

export default function ReadingPage() {
    

    const [readingData, setReadingData] = useState({});
    const [userAnswers, setUserAnswers] = useState({});
    const [booleanResponses, setBooleanResponses] = useState([]);
    const [score, setScore] = useState(0);
    const [settings, setSettings] = useState({})

    let correctAnswers;
    if(readingData.questions?.length > 0){
      correctAnswers = {
        ...readingData.questions.map((item) => item.correct)
      };
    }

    
    

    const checkResponses = (responses) => {
      if (readingData.questions?.length == 0){
        setScore(0)
      }
      const results = []
      for (const [key, value] of Object.entries(userAnswers)) {
        results.push(correctAnswers[key] === value);
      }
      setBooleanResponses(results)

      const totalQs = readingData.questions?.length;
      const count = results.filter(Boolean).length;
      setScore((count / totalQs) * 100);
    
    }


        return (
          <>
            <NavigationMenu></NavigationMenu>

            <div className="flex gap-4 bg-slate-300 ">
              <Controls gameType={"reading"} readingHandler={setReadingData} gameSettings={setSettings}/>

              <div className="space-y-3 mt-2 p-4 w-full max-w-7xl mx-auto">
                <PageCard
                  text={"Reading Comprehension"}
                  bgColor={"oklch(70.7% 0.165 254.624)"}
                ></PageCard>

                <WelcomeText
                  heading={"Welcome to Reading Comphresion Practice"}
                  text={` On this page, you get to take control of your learning. Use
                    the panel on the left to choose how tough you want your
                    passage to be — Beginner, Intermediate, or Advanced — and
                    then pick how many questions you're ready to tackle (3, 5,
                    or 8). Once you're set, we'll generate a unique reading
                    passage just for you, along with comprehension questions to
                    test your skills. It’s a fun, interactive way to boost your
                    reading and critical thinking — so pick your settings and
                    let’s get reading!`}
                ></WelcomeText>

                <Score settings={settings} scoreColor={"oklch(70.7% 0.165 254.624)"} score={score}></Score>

                <Instructions
                  title={"Reading Passage"}
                  text={readingData.content}
                  titleColor={"oklch(70.7% 0.165 254.624)"}
                  gameType={"reading"}
                >
                  {readingData?.questions?.length > 0 && (
                    <>
                      {readingData.questions.map((question, index) => (
                        <div
                          className=" p-4 bg-white border-2 border-[#dee2e6] rounded-md m-2"
                          style={{
                            borderColor:
                              booleanResponses[index] &&
                              booleanResponses?.length > 0
                                ? "green"
                                : "blue",
                          }}
                          key={index}
                        >
                          <h2 className="font-bold text-2xl mb-1 text-[#2c3e50]">
                            Question {index + 1}
                          </h2>

                          <p className="mb-4 text-xl">{question.question}</p>

                          {Object.entries(question.options).map(
                            ([letter, text]) => (
                              <div className="flex-col mb-8">
                                <label
                                  key={letter}
                                  className="border-2 border-[#e9ecef] px-5 py-3 rounded-lg  bg-[#f8f9fa] hover:border-[#a6cbef]"
                                >
                                  <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={letter}
                                    className="px-4 ml-2"
                                    onChange={() =>
                                      setUserAnswers({
                                        ...userAnswers,
                                        [index]: letter,
                                      })
                                    }
                                  />
                                  {" " + letter}. {text}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </>
                  )}
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