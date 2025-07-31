import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";
import {useState} from "react";
import OpenAI from "openai";
import {playAudio} from "openai/helpers/audio"
import axios from "axios";
import {Clock} from "../components/Clock.jsx";
import {useEffect} from "react";
import Controls from "../components/Controls.jsx";
import Instructions from "../components/Instructions.jsx";
import WelcomeText from "../components/WelcomeText.jsx";
import PageCard from "../components/PageCard.jsx";


export default function SpeechPage() {

  const messages = [
    {
      id: 1,
      type: "ai",
      content: "¡Hola! ¿Cómo ha sido tu día?",
      timestamp: "2:34 PM",
    },
    {
      id: 2,
      type: "user",
      content: "Muy bien, he trabajado mucho hoy",
      timestamp: "2:34 PM",
      duration: "8s",
    },
    {
      id: 3,
      type: "ai",
      content: "¡Perfecto! Usaste el presente perfecto correctamente...",
      timestamp: "2:35 PM",
    },
  ];

  const convoType = [
    "Presentation/Formal speech",
    "Casual conversation",
    "Storytelling",
    "Debate/Argument",
    "Interview responses",
    "Impromptu speaking",
  ];

    return (
      <>
        <NavigationMenu />

        <div className="flex gap-4 bg-slate-300 ">
          <Controls gameType="speech" />

          <div className="space-y-3 mt-2 p-4 w-full max-w-7xl mx-auto">
            <PageCard
              text={"Speech Practice"}
              bgColor={"oklch(70.2% 0.183 293.541)"}
              borderColor={"#fff"}
            ></PageCard>

            <WelcomeText
              heading={"Speech Practice"}
              text={`On this page, you get to take control of your learning. Use the
                panel on the left to choose how tough you want your passage to
                be — Beginner, Intermediate, or Advanced — and then pick how
                many questions you're ready to tackle (3, 5, or 8). Once you're
                set, we'll generate a unique reading passage just for you, along
                with comprehension questions to test your skills. It’s a fun,
                interactive way to boost your reading and critical thinking — so
                pick your settings and let’s get reading!`}
            ></WelcomeText>

            <Instructions
              title={"Live Conversation Practice"}
              titleColor={"oklch(70.2% 0.183 293.541)"}
              text={"hi"}
              gameType={"speech"}
            >
              <div className="space-y-2 flex-col justify-between">
                {messages.length > 0 &&
                  messages.map((response, index) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          index % 2 === 0 ? "flex-start" : "flex-end",
                      }}
                    >
                      <div
                        key={index}
                        className="rounded-lg border-2 border-purple-300 p-4 max-w-150"
                        style={{
                          backgroundColor:
                            response.type === "ai"
                              ? "oklch(81.1% 0.111 293.571)"
                              : "oklch(70.7% 0.165 254.624)",
                        }}
                      >
                        <div className="flex justify-between">
                          <h3 className="font-bold text-xl">{response.type}</h3>
                          <p>{response.timestamp}</p>
                        </div>

                        <p className="text-lg">{response.content}</p>
                      </div>{" "}
                    </div>
                  ))}
              </div>

              <div className="flex-col justify-items-center mt-2 ">
                <div className="flex-col p-5 border-2 rounded-lg justify-items-center max-w-150 min-w-100 border-purple-500 align-middle space-y-2">
                  <h3 className="block w-40 h-40 rounded-full bg-purple-400 text-center font-bold text-6xl p-12">
                    3
                  </h3>
                  <p>Seconds to respond</p>

                  <button className="block rounded-lg bg-purple-300 p-2 font-bold text-2xl text-center hover:bg-purple-400">
                    Start Recording
                  </button>
                </div>
              </div>
            </Instructions>
          </div>
        </div>
      </>
    );
}