import axios from "axios";
import { useState, useEffect, use } from "react";
import { useDebounce } from "use-debounce";

export default function Controls({ gameType, conjugationsHandler, readingHandler, gameSettings, handlePrompt}) {
  const [difficulty, setDifficulty] = useState("Beginner");
  const [numQuestions, setNumQuestions] = useState(5);
  const [tense, setTense] = useState("Presente");
  const [topic, setTopic] = useState("Presentation Formal Speech")
  const [settings, setSettings] = useState({})

  const [liveSearchText, setLiveSearchText] = useState("")

  const controlTitle = {reading: "Reading Setup", speech: "Conversation Setup", grammar: "Grammar Setup"}

  useEffect(() => {
    if(gameType === "grammar"){
      const newSettings = {
        difficulty: difficulty,
        numQs: numQuestions,
        tense: tense,
      };
      gameSettings(newSettings)
    } else if(gameType === "speech") {
      const newSettings = {
        difficulty: difficulty,
        topic: topic
      };
      gameSettings(newSettings)
    } else {
      const newSettings = {
        difficulty: difficulty,
        numQs: numQuestions,
        topic: topic,
      };
      gameSettings(newSettings)

    }
    
  
  }, [difficulty, numQuestions, tense, topic]);

  const questionOptions = {
    reading: ["3", "5", "8"],
    grammar: ["5", "10", "15"],
    speech: ["3s", "5s", "10s"],
  };

  const btnText = {
    reading: "New Passage",
    grammar: "New Questions",
    speech: "New Prompt",
  };

  const verbTenses = ["Presente", "Imperfecto"];

  const topics = [
    "Animals",
    "Culture",
    "Food",
    "Health",
    "History",
    "Nature",
    "People",
    "Science",
    "Sports",
    "Travel",
  ];

    const convoType = [
      "Presentation Formal speech",
      "Casual conversation",
      "Storytelling",
      "Debate/Argument",
      "Interview responses",
      "Impromptu speaking",
    ];

  function loadConjugations() {
    if(gameType == "grammar"){
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
      });}
      else if (gameType == "reading"){
        axios
          .get("http://localhost:8080/reading", {
            params: {
              difficulty: difficulty,
              topic: topic,
              q: liveSearchText,
            },
          })
          .then((res) => {
            readingHandler(res.data);
          });

      } else if (gameType == "speech"){
        axios.get("http://localhost:8080/speech-prompt", {
          params: {
            difficulty: difficulty,
            topic: topic
          }
        }).then((res) => {
          handlePrompt(res.data);
        });
      }
  }

  return (
    <>
      <aside className="h-screen p-4 bg-[rgb(55,75,90)] space-y-2 max-w-xs">
        <h2 className="font-bold text-3xl text-[#f8f9fa] whitespace-nowrap">
          {controlTitle[gameType]}
        </h2>

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

        {gameType == "reading" && (
          <>
            <div className="flex items-center gap-2">
              <label className="text-xl text-[#bdc3c7] font-bold ">
                Search:{" "}
              </label>

              <input
                type="text"
                className="p-2 border rounded-md	bg-[#395c7f] text-white border-[#34495e] font-bold"
                placeholder="type"
              ></input>
            </div>
            <div>
              <label className="text-xl text-[#bdc3c7] font-bold ">
                Topic:{" "}
              </label>

              <div className="flex-col space-y-2 mt-2">
                <select
                  id="tense"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="p-2 border rounded-md	bg-[#395c7f] text-white border-[#34495e] font-bold "
                >
                  {topics.map((topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {gameType == "speech" && (
          <>

            <div>
              <label className="text-xl text-[#bdc3c7] font-bold ">
                Topic:{" "}
              </label>

              <div className="flex-col space-y-2 mt-2">
                <select
                  id="tense"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="p-2 border rounded-md	bg-[#395c7f] text-white border-[#34495e] font-bold "
                >
                  {convoType.map((topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
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
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {gameType != "speech" && (
          <>
            <label className="text-xl text-[#bdc3c7] font-bold">
              Questions:{" "}
            </label>
            <div className="flex gap-3 mt-2 text-center">
              <button
                className={`flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 w-20 text-white 
            ${
              numQuestions == parseInt(questionOptions[gameType][0])
                ? "bg-[#e67e22]"
                : "bg-[#f39c12] hover:bg-[#e67e22]"
            }`}
                value={parseInt(questionOptions[gameType][0])}
                onClick={(e) => setNumQuestions(e.target.value)}
              >
                {questionOptions[gameType][0]}
              </button>
              <button
                className={`flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 w-20 text-white 
              ${
                numQuestions == parseInt(questionOptions[gameType][1])
                  ? "bg-[#e67e22]"
                  : "bg-[#f39c12] hover:bg-[#e67e22]"
              }`}
                value={parseInt(questionOptions[gameType][1])}
                onClick={(e) => setNumQuestions(e.target.value)}
              >
                {questionOptions[gameType][1]}
              </button>
              <button
                className={`flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 w-20 text-white 
              ${
                numQuestions == parseInt(questionOptions[gameType][2])
                  ? "bg-[#e67e22]"
                  : "bg-[#f39c12] hover:bg-[#e67e22]"
              }`}
                value={parseInt(questionOptions[gameType][2])}
                onClick={(e) => setNumQuestions(e.target.value)}
              >
                {questionOptions[gameType][2]}
              </button>
            </div>{" "}
          </>
        )}

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
