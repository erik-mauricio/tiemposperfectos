import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";
import {useState} from "react";
import OpenAI from "openai";
import {playAudio} from "openai/helpers/audio"
import axios from "axios";
import {Clock} from "../components/Clock.jsx";
import {useEffect} from "react";
import Controls from "../components/Controls.jsx";


export default function SpeechPage() {

    return (
      <>
        <NavigationMenu />

        <div className="flex gap-4 bg-slate-300 ">
          <Controls gameType="speech"/>

          <div className="space-y-3 mt-2 p-4">
            <div className="bg-[#8099aa] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6  max-w-4lg space-y-4">
              <h1 className="font-bold text-4xl text-center ">
                Speech Practice
              </h1>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6  max-w-4lg space-y-4">
              <h1 className="font-bold text-2xl text-[#2c3e50]">
                Welcome to Reading Comphresion Practice
              </h1>
              <p>
                On this page, you get to take control of your learning. Use the
                panel on the left to choose how tough you want your passage to
                be — Beginner, Intermediate, or Advanced — and then pick how
                many questions you're ready to tackle (3, 5, or 8). Once you're
                set, we'll generate a unique reading passage just for you, along
                with comprehension questions to test your skills. It’s a fun,
                interactive way to boost your reading and critical thinking — so
                pick your settings and let’s get reading!
              </p>
            </div>

            <div className="border-0 rounded-md overflow-hidden bg-white">
              <h2 className="font-bold text-3xl text-white bg-slate-600 p-4">
                Live Conversation Practice
              </h2>
              <div className="p-3">
                <h3 className="text-2xl ">Prompt</h3>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}