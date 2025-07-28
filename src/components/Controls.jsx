import axios from "axios";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function Controls({ gameType, conjugationsHandler }) {
  const [difficulty, setDifficulty] = useState("beginner");
  const [numQuestions, setNumQuestions] = useState(5);
  const [tense, setTense] = useState("presente");

  console.log(numQuestions);
  console.log(tense);

  const handleChange = (e) => setDifficulty(e.target.value);

  const questionOptions = {
    reading: ["3", "5", "8"],
    grammar: ["5", "10", "15"],
    speech: ["3s", "5s", "10s"],
  };

  const btnText = {
    reading: "New Passage",
    grammar: "New Questions",
    speech: "New Conversation",
  };

  const verbTenses = ["presente", "imperfecto"];

  function loadConjugations() {
    axios
      .get("http://localhost:8080/conjugations", {
        params: {
          tense: tense,
          difficulty: difficulty,
          numberQuestions: numQuestions,
        },
      })
      .then((res) => {
        conjugationsHandler(res.data);
      });
  }

  return (
    <>
      <aside className="h-screen p-4 bg-[rgb(55,75,90)] space-y-2 max-w-xs">
        <h2 className="font-bold text-3xl text-[#f8f9fa]">Reading Setup</h2>

        {gameType == "grammar" && (
          <div>
            <label className="text-xl text-[#bdc3c7] font-bold ">
              Grammar Tense:{" "}
            </label>

            <div className="flex-col space-y-2 mt-2">
              <select
                id="tense"
                value={tense}
                onChange={(e) => setTense(e.target.value)}
                className="p-2 border rounded-md	bg-[#395c7f] text-white border-[#34495e] font-bold "
              >
                {verbTenses.map((tense, index) => (
                  <option key={index} value={tense}>
                    {tense}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <label className="text-xl text-[#bdc3c7] font-bold ">
          Difficulty:{" "}
        </label>

        <div className="flex col space-y-2 mt-2">
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-2 border rounded-md	bg-[#395c7f] text-white border-[#34495e] font-bold "
          >
            <option value="beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <label className="text-xl text-[#bdc3c7] font-bold">Questions: </label>
        <div className="flex gap-3 mt-2 text-center">
          <button
            className="flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22]"
            value={parseInt(questionOptions[gameType][0])}
            onClick={(e) => setNumQuestions(e.target.value)}
          >
            {questionOptions[gameType][0]}
          </button>
          <button
            className="flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22]"
            value={parseInt(questionOptions[gameType][1])}
            onClick={(e) => setNumQuestions(e.target.value)}
          >
            {questionOptions[gameType][1]}
          </button>
          <button
            className="flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22] clicked"
            value={parseInt(questionOptions[gameType][2])}
            onClick={(e) => setNumQuestions(e.target.value)}
          >
            {questionOptions[gameType][2]}
          </button>
        </div>

        <button
          className="rounded-md px-6 py-4 bg-[#3498db] mt-4 text-white font-bold text-center hover:bg-[#2980b9] w-full max-w-xs"
          onClick={() => loadConjugations()}
        >
          {btnText[gameType]}
        </button>

        <br className="bg-black"></br>
      </aside>
    </>
  );
}
