import {useEffect, useState} from "react";
import axios from "axios";
import {useDebounce} from "use-debounce";

export default function GameSettings({isConjugation, conjugationData, isReading, readingData}) {
    const [liveSearchText, setLiveSearchText] = useState("");
    const [searchParam] = useDebounce(liveSearchText, 600);
    const [settings, setSettings] = useState({difficulty: "easy", numberQuestions: "5"})

    function loadEvents() {

        if (isConjugation) {
            axios.get("http://localhost:8080/conjugations", {
                params: {
                    search: searchParam,
                    difficulty: settings.difficulty,
                    numberQuestions: settings.numberQuestions,
                }

            }).then(res => {
                conjugationData(res.data);
            })
        } else if(isReading) {
            axios.get("http://localhost:8080/reading", {
                params: {
                    difficulty: settings.difficulty,
                    numberQuestions: settings.numberQuestions,

                }
            }).then(res => {
                console.log('reading data', res.data);
                readingData(res.data);

            })
        }
    }



useEffect(() => {
    loadEvents();
}, [searchParam, settings.difficulty, settings.numberQuestions]);

return (
    <>


        <div
            className={"bg-grey-100 border-2 border-slate-800 space-y-4 px-10 rounded-md items-center"}>

            <div className={"flex mt-7 gap-2"}>
                <label className={"font-medium"} htmlFor={"difficulty"}>Difficulty: </label>

                <select className={"border-2 border-red-500 rounded-sm"} id="difficulty"
                        name="difficulty" value={settings.difficulty}
                        onChange={(e) => setSettings({
                            ...settings,
                            difficulty: e.target.value
                        })}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>


            <div className={"flex mt-2 gap-2"}>
                <label className={"text-[16px] font-medium"} htmlFor={"numberQuestions"}>Number
                    of Questions: </label>

                <select className={"border-2 border-red-500 rounded-sm px-2"}
                        id="numberQuestions" value={settings.numberQuestions}
                        onChange={(e) => setSettings({
                            ...settings,
                            numberQuestions: e.target.value
                        })} name="numberQuestions">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>

            {!!isConjugation &&
                <div className={"flex mt-2 gap-2"}>
                    <label className={"font-medium mt-2"} htmlFor={"tense"}>Tense:</label>
                    <input className={"border-2 border-red-500 rounded-sm py-2"} type="search"
                           value={liveSearchText}
                           onChange={(e) => setLiveSearchText(e.target.value)} name="tense"
                           id="tense" placeholder="Present"/>
                </div>

            }

        </div>
    </>
)
}