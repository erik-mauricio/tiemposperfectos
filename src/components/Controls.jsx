export default function Controls({
  title,
  difficulty,
  onDifficultyChange,
  numQuestions,
  questionOptions = [],
  onNumQuestionsChange,
  tense,
  tenseOptions = [],
  onTenseChange,
  topic,
  topicOptions = [],
  topicLabel = "Topic",
  onTopicChange,
  searchText,
  onSearchTextChange,
  showTense = false,
  showTopic = false,
  showSearch = false,
  showQuestionOptions = true,
  generateLabel = "Generate",
  onGenerate,
}) {
  return (
    <aside className="h-screen p-4 bg-[rgb(55,75,90)] space-y-2 max-w-xs">
      <h2 className="font-bold text-3xl text-[#f8f9fa] whitespace-nowrap">{title}</h2>

      {showTense && (
        <div>
          <label className="text-xl text-[#bdc3c7] font-bold ">Grammar Tense:</label>
          <div className="flex-col space-y-2 mt-2">
            <select
              id="tense"
              value={tense}
              onChange={(event) => onTenseChange?.(event.target.value)}
              className="p-2 border rounded-md bg-[#395c7f] text-white border-[#34495e] font-bold"
            >
              {tenseOptions.map((tenseOption) => (
                <option key={tenseOption} value={tenseOption}>
                  {tenseOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {showSearch && (
        <div className="flex items-center gap-2">
          <label className="text-xl text-[#bdc3c7] font-bold ">Search:</label>
          <input
            type="text"
            value={searchText}
            className="p-2 border rounded-md bg-[#395c7f] text-white border-[#34495e] font-bold"
            placeholder="Type"
            onChange={(event) => onSearchTextChange?.(event.target.value)}
          />
        </div>
      )}

      {showTopic && (
        <div>
          <label className="text-xl text-[#bdc3c7] font-bold ">{topicLabel}:</label>
          <div className="flex-col space-y-2 mt-2">
            <select
              id="topic"
              value={topic}
              onChange={(event) => onTopicChange?.(event.target.value)}
              className="p-2 border rounded-md bg-[#395c7f] text-white border-[#34495e] font-bold"
            >
              {topicOptions.map((topicOption) => (
                <option key={topicOption} value={topicOption}>
                  {topicOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <label className="text-xl text-[#bdc3c7] font-bold ">Difficulty:</label>
      <div className="flex col space-y-2 mt-2">
        <select
          id="difficulty"
          value={difficulty}
          onChange={(event) => onDifficultyChange?.(event.target.value)}
          className="p-2 border rounded-md bg-[#395c7f] text-white border-[#34495e] font-bold"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {showQuestionOptions && questionOptions.length > 0 && (
        <>
          <label className="text-xl text-[#bdc3c7] font-bold">Questions:</label>
          <div className="flex gap-3 mt-2 text-center">
            {questionOptions.map((option) => {
              const selected = Number(numQuestions) === Number(option);
              return (
                <button
                  key={option}
                  className={`flex-1 rounded-lg py-2 px-8 font-semibold transition-all duration-200 w-20 text-white ${
                    selected ? "bg-[#e67e22]" : "bg-[#f39c12] hover:bg-[#e67e22]"
                  }`}
                  type="button"
                  onClick={() => onNumQuestionsChange?.(Number(option))}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </>
      )}

      <button
        className="rounded-md px-6 py-4 bg-[#3498db] mt-4 text-white font-bold text-center hover:bg-[#2980b9] w-full max-w-xs"
        type="button"
        onClick={onGenerate}
      >
        {generateLabel}
      </button>
    </aside>
  );
}
