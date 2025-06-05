import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";
import {useState} from "react";

export default function ReadingPage() {

    const [readingData, setReadingData] = useState();
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
                        <div className="bg-grey-100 min-h-screen ">
                            <NavigationMenu/>

                            <div className={"mx-auto max-w-[1300px]"}>
                                <h1 className={"text-4xl font-semibold text-slate-800 mt-5"}>Reading Comp</h1>
                                <div className={"flex"}>
                                    <p className={"mt-2 text-lg"}>Welcome to the conjugation practice section!
                                        Here, you’ll tackle verb conjugation challenges designed to sharpen your
                                        understanding
                                        of Spanish tenses and moods. Start by selecting your difficulty
                                        level—whether you’re learning the basics, polishing intermediate skills, or
                                        mastering advanced conjugations. Then, choose the tense or mood you want to
                                        focus on,
                                        and dive into engaging exercises tailored to help you practice and reinforce
                                        your skills.
                                        It’s a great way to build a solid foundation, improve accuracy, and boost
                                        your confidence
                                        in using verbs correctly.
                                        Get ready to conquer conjugations and elevate your Spanish—one verb at a
                                        time!</p>

                                    <GameSettings isConjugation={false} isReading={true} readingData={setReadingData} />
                                </div>

                                {
                                    readingData && (
                                        <div className={"mt-5 bg-gray-200 p-4 rounded-md"}>
                                                <section>
                                                <div className={"mb-5 bg-white p-2 border-2 border-black rounded-sm"}>
                                                    <h1 className={"text-2xl font-semibold text-slate-800"}>Paragraph</h1>
                                                    <p className={"mt-2 text-lg"}>{readingData.text}</p>
                                                </div>

                                                    {
                                                        readingData.questions && readingData.questions.map((question, index) => (
                                                            <div className={`mb-5 bg-white p-2 border-2 border-black rounded-sm space-y-2 ${borderColor(index)}` } key={index}>
                                                                <h1 className={"text-2xl font-semibold text-slate-800"}>{question.question}</h1>

                                                                {question.responses && Object.entries(question.responses).map(([letter, response]) => (
                                                                    <div key={letter} className="flex items-center space-x-2">
                                                                        <input
                                                                            type="radio"
                                                                            id={`question-${index}-${letter}`}
                                                                            name={`question-${index}`}
                                                                            value={letter}
                                                                            onChange={(e) =>
                                                                                setUserResponses({...userResponses, [index]: e.target.value})}
                                                                        />
                                                                        <label htmlFor={`question-${index}-${letter}`}>
                                                                            {letter}. {response}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))

                                                    }
                                                </section>

                                        </div>
                                    )
                                }
                                <button onClick={() => handleResponse()}
                                    className={"text-lg font-semibold bg-slate-600 p-2 border-2 rounded-md mt-5 text-red-500"}>
                                    Check Responses
                                </button>



                            </div>
                        </div>

                    </>
        )


}