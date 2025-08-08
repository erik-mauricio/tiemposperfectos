export default function Score({settings, score, scoreColor, gameType}){
  console.log(settings.tense)

   
    return (
      <div className="rounded-md border-2 bg-white p-2 flex justify-between border-[#e9ecef]">
        <div>
          <h2 className="text-2xl text-[#2c3e50] font-bold">
            {gameType === "grammar"
              ? `Tense: ${settings.tense} `
              : `Topic: ${settings.topic}`}
          </h2>

          <h3 className="text-xl text-gray-500">
            Difficulty: {settings.difficulty} * {settings.numQs} excersies
          </h3>
        </div>

        <div>
          <h2
            className="text-2xl text-center font-bold text-[#e74c3c]"
            style={{ color: scoreColor }}
          >
            {score}%
          </h2>
          <p className="text-xl text-gray-500">Current score</p>
        </div>
      </div>
    );
}