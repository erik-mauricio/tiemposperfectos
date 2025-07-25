import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";
import {use, useState} from "react";
import {useEffect} from "react";
import Instructions from "../components/Instructions.jsx";
import Controls from "../components/Controls.jsx";


export default function GrammarPage() {
  const exercises = 
    [
        {
            sentence: "Yo _____ (estudiar) español por tres años.",
            answer: "he estudiado",
            hint: "Use 'haber' + past participle",
            translation: "I have studied Spanish for three years."
        },
        {
            sentence: "Ellos _____ (viajar) a México este año.",
            answer: "han viajado", 
            hint: "Remember to conjugate 'haber' for 'ellos'",
            translation: "They have traveled to Mexico this year."
        },
        {
            sentence: "¿Tú _____ (ver) esa película?",
            answer: "has visto",
            hint: "'ver' has an irregular past participle",
            translation: "Have you seen that movie?"
        },
        {
            sentence: "Nosotros _____ (comer) en ese restaurante antes.",
            answer: "hemos comido",
            hint: "Regular -er verb + nosotros form of haber",
            translation: "We have eaten at that restaurant before."
        },
        {
            sentence: "María _____ (escribir) muchas cartas.",
            answer: "ha escrito",
            hint: "'escribir' has an irregular past participle",
            translation: "María has written many letters."
        }
    ]


    const [conjugations, setConjugations] = useState(exercises);
    const [userResponses, setUserResponses] = useState({});
    const [results, setResults] = useState({});

    const[difficulty, setDifficulty] = useState()



    function handleResponse(){
        const result = {}
        for(let i = 0; i < conjugations.length; i++){
            result[i] = {
                isCorrect: conjugations[i].answer === userResponses[i],
                userResponse: userResponses[i],
                correctResponse: conjugations[i].answer
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

    const splitSentence = (setence) => {
      const newSentence = setence.split("_____");
      return newSentence
    }

    return (
      <>
        <NavigationMenu />

        <div className="flex gap-4 bg-slate-300 ">
          <Controls gameType={"grammar"} />

          <div className="space-y-3 mt-2 p-4">
            <div className="bg-[#e74d3ce3] rounded-lg border-l-4 border-white shadow-md hover:shadow-lg transition-shadow duration-300 p-6  max-w-4lg space-y-4">
              <h1 className="font-bold text-4xl text-center ">
                Grammar Practice
              </h1>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6  max-w-4lg space-y-4">
              <h1 className="font-bold text-2xl text-[#2c3e50]">
                Welcome to Reading Comphresion Practice
              </h1>
              <p>
                On this page, you get to take control of your learning. Use the
                panel on the left to choose how tough you want your passage to
                be — Beginner, Intermediate, or Advanced — and then pick how
                many questions you're ready to tackle (3, 5, or 8). Once you're
                set, we'll generate a unique reading passage just for you, along
                with comprehension questions to test your skills. It’s a fun,
                interactive way to boost your reading and critical thinking — so
                pick your settings and let’s get reading!
              </p>
            </div>

            <div className="rounded-md border-2 bg-white p-2 flex justify-between border-[#e9ecef]">
              <div>
                <h2 className="text-2xl text-[#2c3e50] font-bold">Tense</h2>

                <h3 className="text-xl text-gray-500">
                  Difficulty: Beginner * 5 excersies
                </h3>
              </div>

              <div>
                <h2 className="text-2xl text-center font-bold text-[#e74c3c]">
                  60%
                </h2>
                <p className="text-xl text-gray-500">Current score</p>
              </div>
            </div>

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
              {conjugations.map((question, index) => (
                <div className="p-3" key={index}>
                  <h3 className="text-[#e74c3c] font-bold text-xl">
                    Exercise {index + 1}
                  </h3>
                  <div className="rounded-md bg-[#f8f9fa] border-2 border-[#e9ecef] p-4 hover:border-[#e74c3c]">
                    <label>
                      {splitSentence(question.sentence)[0]}
                      <input
                        type="text"
                        className="border-2 border-[#e74c3c] rounded-md"
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
            </Instructions>
          </div>
        </div>
      </>
    );


}