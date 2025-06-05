import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";
import {useState} from "react";
import OpenAI from "openai";
import { playAudio } from "openai/helpers/audio"



export default function SpeechPage() {

    const [isActive, setIsActive] = useState(true);
    const [userText, setUserText] = useState('');
    const [AIText, setAIText] = useState('');

    function handleOnRecord() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();


        recognition.onresult = async function (event) {
            const transcript = event.results[0][0].transcript;
            console.log("Transcript:", transcript);
            setUserText(transcript);
        };


        recognition.start();
    }

    async function handleAIAudio(){
        const openai = new OpenAI();

        const response = await openai.audio.speech.create({
            model: "gpt-4o-mini-tts",
            voice: "coral",
            input: userText,
            instructions: "Speak in a cheerful and positive tone.",
            response_format: "wav",
        });

        await playAudio(response);

    }

    return (
        <>

            <div className="bg-grey-100 min-h-screen ">
                <NavigationMenu/>

                <div className={"mx-auto max-w-[1300px]"}>
                    <h1 className={"text-4xl font-semibold text-slate-800 mt-5"}>Speaking Practice</h1>
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
                    </div>

                    <button className={"text-lg font-semibold bg-slate-600 p-2 border-2 rounded-md mt-5 text-red-500"}
                    onClick={() => handleOnRecord()}>Begin</button>



                </div>
            </div>


        </>
    )


}