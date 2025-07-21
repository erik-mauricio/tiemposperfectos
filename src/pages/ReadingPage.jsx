import NavigationMenu from "../components/NavigationMenu.jsx";
import {useState} from "react";
import Controls from "../components/Controls.jsx";

export default function ReadingPage() {
    const mockData = {
      text: "La cultura española es muy rica y diversa. España tiene una larga historia que se remonta a miles de años. Los romanos, los árabes y otros pueblos han influido en la cultura española. Hoy en día, España es conocida por su arte, su música, su comida y sus tradiciones. Ciudades como Madrid, Barcelona y Sevilla atraen a millones de turistas cada año. La gastronomía española incluye platos famosos como la paella, el jamón ibérico y las tapas.",
      questions: [
        {
          question: "¿Qué hace que la cultura española sea especial?",
          responses: {
            A: "Solo la influencia romana",
            B: "Su riqueza y diversidad cultural",
            C: "Únicamente su comida",
            D: "Solo sus ciudades modernas",
          },
          answer: "B",
        },
        {
          question: "¿Qué pueblos han influido en la cultura española?",
          responses: {
            A: "Solo los romanos",
            B: "Solo los árabes",
            C: "Los romanos, árabes y otros pueblos",
            D: "Solo los españoles nativos",
          },
          answer: "C",
        },
        {
          question: "¿Por qué es conocida España hoy en día?",
          responses: {
            A: "Solo por su arte",
            B: "Arte, música, comida y tradiciones",
            C: "Solo por sus ciudades",
            D: "Solo por el turismo",
          },
          answer: "B",
        },
      ],
    };

    const [readingData, setReadingData] = useState(mockData);
    const [userResponses, setUserResponses] = useState({});
    const [results, setResults] = useState({});





    function handleResponse(){
        const result = {}
        for(let i = 0; i < readingData.questions.length; i++){
            result[i] = {
                isCorrect: readingData.questions[i].answer === userResponses[i],
                userResponse: userResponses[i],
                correctResponse: readingData.questions[i].answer
            };
        }
        setResults(result);

    }

    function borderColor(index) {
        if (results[index] && results[index].isCorrect) {
            return "border-green-400";
        } else if (results[index] && !results[index].isCorrect) {
            return "border-red-500";
        } else {
            return "border-black";
        }
    }

        return (
          <>
            <NavigationMenu></NavigationMenu>

            <div className="flex gap-4 bg-slate-300">
              <Controls />

              <div className="space-y-3 mt-2 p-4">
                <div className="bg-[#bdc3c7] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-[#3498db] max-w-4lg space-y-4">
                  <h1 className="font-bold text-4xl text-center ">
                    Reading Comphresion
                  </h1>
                </div>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6  max-w-4lg space-y-4">
                  <h1 className="font-bold text-2xl text-[#2c3e50]">
                    Welcome to Reading Comphresion Practice
                  </h1>
                  <p>
                    On this page, you get to take control of your learning. Use
                    the panel on the left to choose how tough you want your
                    passage to be — Beginner, Intermediate, or Advanced — and
                    then pick how many questions you're ready to tackle (3, 5,
                    or 8). Once you're set, we'll generate a unique reading
                    passage just for you, along with comprehension questions to
                    test your skills. It’s a fun, interactive way to boost your
                    reading and critical thinking — so pick your settings and
                    let’s get reading!
                  </p>
                </div>

                <div className="border-0 rounded-md overflow-hidden">
                  <h2 className="font-bold text-3xl text-white bg-slate-600 p-4">
                    Reading Passage
                  </h2>

                  <div className="p-4  bg-[#f8f9fa]">
                    <p>
                      On this page, you get to take control of your learning.
                      Use the panel on the left to choose how tough you want
                      your passage to be — Beginner, Intermediate, or Advanced —
                      and then pick how many questions you're ready to tackle
                      (3, 5, or 8). Once you're set, we'll generate a unique
                      reading passage just for you, along with comprehension
                      questions to test your skills. It’s a fun, interactive way
                      to boost your reading and critical thinking — so pick your
                      settings and let’s get reading!
                    </p>
                  </div>
                </div>

                {readingData?.questions?.length > 0 && (
                  <div className="space-y-4">
                    {readingData.questions.map((question, index) => (
                      <div
                        className="border-2 rounded-md border-black p-4 bg-white"
                        key={index}
                      >
                        <h2 className="font-bold text-2xl mb-2 bg-">
                          Question {index + 1}
                        </h2>

                        <p className="mb-4 text-xl">{question.question}</p>

                        {Object.entries(question.responses).map(
                          ([letter, text]) => (
                            <div className="flex-col mb-5 ">
                              <label
                                key={letter}
                                className="border-2 border-black px-5 py-2 rounded-lg w-[500px]"
                              >
                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  value={text}
                                  className="p-2 "
                                />
                                {letter}. {text}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <button className="border-2 border-black bg-sky-700 p-2 rounded-lg min-w-sm">
                  Submit
                </button>
              </div>
            </div>
          </>
        );


}