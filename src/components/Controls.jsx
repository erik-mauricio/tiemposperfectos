import { useState } from "react";
export default function Controls({gameType}) {
  const [difficulty, setDifficulty] = useState("Beginner");
  const [numQuestions, setNumQuestions] = useState();

  const handleChange = (e) => setDifficulty(e.target.value);

  const questionOptions = {
    "reading": ["3", "5", "8"],
    "grammar": ["5", "10", "15"],
    "speech": ["3s", "5s", "10s"]
  }

  const btnText = {
    reading: "New Passage",
    grammar: "New Questions",
    speech: "New Conversation",
  };

  const verbTenses = ["Presente", "Imperfecto"]

 
  return (
    <>
      <aside className="h-screen p-4 bg-[rgb(55,75,90)] space-y-2 max-w-xs">
        <h2 className="font-bold text-3xl text-[#f8f9fa]">Reading Setup</h2>

        {gameType == "grammar" && (
          <div>
            <label className="text-xl text-[#bdc3c7] font-bold ">
              Grammar Tense:{" "}
            </label>

            <div className="flex col space-y-2 mt-2">
              <select
                id="difficulty"
                value={difficulty}
                onChange={handleChange}
                className="p-2 border rounded-md	bg-[#395c7f] text-white border-[#34495e] font-bold "
              >
                {verbTenses.map((tense, index) => (
                  <option value="Beginner">{tense}</option>
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
            className="p-2 border rounded-md	bg-[#395c7f] text-white border-[#34495e] font-bold "
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <label className="text-xl text-[#bdc3c7] font-bold">Questions: </label>
        <div className="flex gap-3 mt-2 text-center">
          <button className="flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22]">
            {questionOptions[gameType][0]}
          </button>
          <button className="flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22]">
            {questionOptions[gameType][1]}
          </button>
          <button className="flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22] clicked">
            {questionOptions[gameType][2]}
          </button>
        </div>

        <button className="rounded-md px-6 py-4 bg-[#3498db] mt-4 text-white font-bold text-center hover:bg-[#2980b9] w-full max-w-xs">
          {btnText[gameType]}
        </button>

        <br className="bg-black"></br>
      </aside>
    </>
  );
}
