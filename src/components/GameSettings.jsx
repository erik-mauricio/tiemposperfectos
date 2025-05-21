export default function GameSettings({isConjugation}) {
    return(
    <div className={"bg-grey-100 border-2 border-slate-800 space-y-4 px-10 rounded-md items-center"}>
        <div className={"flex mt-7 gap-2"}>
        <label className={"font-medium"} htmlFor={"difficulty"}>Difficulty: </label>

        <select className={"border-2 border-red-500 rounded-sm"} id="difficulty" name="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        </div>


        <div className={"flex mt-2 gap-2"}>
        <label className={"text-[16px] font-medium"} htmlFor={"numberQuestions"}>Number of Questions: </label>

        <select className={"border-2 border-red-500 rounded-sm"} id="numberQuestions" name="numberQuestions">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select>
        </div>

        {!!isConjugation &&
            <div className={"flex mt-2 gap-2"}>
                    <label className={"font-medium mt-2"} htmlFor={"tense"}>Tense:</label>
                    <input className={"border-2 border-red-500 rounded-sm py-2"} type="search" name="tense" id="tense" placeholder="Present"/>
            </div>

        }

    </div>
    )
}