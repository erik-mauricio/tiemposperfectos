export default function GameSettings({
  difficulty,
  numberQuestions,
  searchText,
  onDifficultyChange,
  onNumberQuestionsChange,
  onSearchTextChange,
  showSearch = false,
  difficultyOptions = ["easy", "medium", "hard"],
  questionOptions = ["5", "10", "15"],
}) {
  return (
    <div className="bg-grey-100 border-2 border-slate-800 space-y-4 px-10 rounded-md items-center">
      <div className="flex mt-7 gap-2">
        <label className="font-medium" htmlFor="difficulty">
          Difficulty:
        </label>

        <select
          className="border-2 border-red-500 rounded-sm"
          id="difficulty"
          name="difficulty"
          value={difficulty}
          onChange={(event) => onDifficultyChange?.(event.target.value)}
        >
          {difficultyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex mt-2 gap-2">
        <label className="text-[16px] font-medium" htmlFor="numberQuestions">
          Number of Questions:
        </label>

        <select
          className="border-2 border-red-500 rounded-sm px-2"
          id="numberQuestions"
          value={numberQuestions}
          onChange={(event) => onNumberQuestionsChange?.(event.target.value)}
          name="numberQuestions"
        >
          {questionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {showSearch && (
        <div className="flex mt-2 gap-2">
          <label className="font-medium mt-2" htmlFor="search">
            Search:
          </label>
          <input
            className="border-2 border-red-500 rounded-sm py-2"
            type="search"
            value={searchText}
            onChange={(event) => onSearchTextChange?.(event.target.value)}
            name="search"
            id="search"
            placeholder="Present"
          />
        </div>
      )}
    </div>
  );
}
