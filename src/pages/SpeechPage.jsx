import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";
import {useState} from "react";
import OpenAI from "openai";
import {playAudio} from "openai/helpers/audio"
import axios from "axios";
import {Clock} from "../components/Clock.jsx";


export default function SpeechPage() {

    const [userText, setUserText] = useState([]);
    const [AIText, setAIText] = useState([]);
    const [prompt, setPrompt] = useState();
    const [recordingActive, setRecordingActive] = useState(false);
    const [isUserTurn, setIsUserTurn] = useState(false);
    const [isIntermission, setIsIntermission] = useState(false);
    const [isClockActive, setIsClockActive] = useState(false);
    const [isMicrophoneRecognized, setIsMicrophoneRecognized] = useState(false);


    function handleOnRecord() {
        if (isMicrophoneRecognized) {
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        setIsMicrophoneRecognized(true);

        recognition.onresult = async function (event) {
            const transcript = event.results[0][0].transcript;
            setUserText(prev => [...prev, transcript]);
            setIsClockActive(true)

            setTimeout(() => {
                setIsIntermission(true)
                setIsUserTurn(false);
            }, 5000);
        };

        recognition.onend = function () {
            setIsMicrophoneRecognized(false);
        };

        recognition.onerror = function () {
            setIsMicrophoneRecognized(false);
        };

        recognition.start();
    }


    function generatePrompt() {
        axios.post("http://localhost:8080/generate-prompt", {}).then(res => {
            setPrompt(res.data.prompt);

        })
    }

    function AISpeak() {
        axios.post("http://localhost:8080/AI-speak", {
            text: userText[userText.length - 1],
            topic: prompt,

        }).then(res => {
            setAIText(prev => [...prev, res.data.AIResponse]);
            setIsClockActive(true)
            setTimeout(() => {
                setIsIntermission(true)
                setIsUserTurn(true);
            }, 5000);
        })
    }

    useEffect(() => {
        if (recordingActive) {
            if (isUserTurn) {
                setIsIntermission(false);
                handleOnRecord();
            } else {
                setIsIntermission(false)
                AISpeak();
            }
        }
    }, [isUserTurn, recordingActive]);


    return (
        <>

            <div className="bg-grey-100 min-h-screen ">
                <NavigationMenu/>

                <div className={"mx-auto max-w-[1300px]"}>
                    <h1 className={"text-4xl font-semibold text-slate-800 mt-5"}>Speaking
                        Practice</h1>
                    <div className={"flex"}>
                        <p className={"mt-2 text-lg"}>Welcome to the conjugation practice section!
                            Here, you’ll tackle verb conjugation challenges designed to sharpen your
                            understanding
                            of Spanish tenses and moods. Start by selecting your difficulty
                            level—whether you’re learning the basics, polishing intermediate skills,
                            or
                            mastering advanced conjugations. Then, choose the tense or mood you want
                            to
                            focus on,
                            and dive into engaging exercises tailored to help you practice and
                            reinforce
                            your skills.
                            It’s a great way to build a solid foundation, improve accuracy, and
                            boost
                            your confidence
                            in using verbs correctly.
                            Get ready to conquer conjugations and elevate your Spanish—one verb at a
                            time!</p>
                    </div>

                    <div>
                        <button onClick={() => generatePrompt()}
                                className={"text-lg font-semibold bg-slate-600 p-2 border-2 rounded-md mt-5 text-red-500"}>Generate
                            Prompt
                        </button>

                    </div>

                    {prompt && (
                        <div
                            className={"mt-5 bg-gray-200 p-4 rounded-md z-4 fixed top-0 left-0 w-full h-full"}>
                            {
                                isClockActive && (
                                    <Clock duration={10} isReordingActive={setRecordingActive}></Clock>
                                )
                            }
                            <div className={"mb-5  mt-2 bg-white p-2 border-2 border-black rounded-sm"}>
                                <h1 className={"text-2xl font-semibold text-slate-800"}>Prompt: {prompt}</h1>


                                <button onClick={() => setRecordingActive(true)}
                                        className={"text-lg font-semibold bg-slate-600 p-2 " +
                                            "border-2 rounded-md mt-5 text-red-500"}>Begin
                                    Conversation
                                </button>

                                {
                                    isIntermission && (
                                        <Clock duration={5} isReordingActive={setRecordingActive}></Clock>
                                    )
                                }


                                {userText.length > 0 && (
                                    <div className="mt-3 bg-blue-100 p-3 rounded">
                                        <h2 className="text-xl font-bold text-blue-900">You said:</h2>
                                        <p>{userText[userText.length - 1]}</p>
                                    </div>
                                )}

                                {AIText.length > 0 && (
                                    <div className="mt-3 bg-green-100 p-3 rounded">
                                        <h2 className="text-xl font-bold text-green-900">AI said:</h2>
                                        <p>{AIText[AIText.length - 1]}</p>
                                    </div>
                                )}


                            </div>
                        </div>
                    )

                    }


                </div>
            </div>


        </>
    )
}