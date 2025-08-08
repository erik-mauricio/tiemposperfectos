import NavigationMenu from "../components/NavigationMenu.jsx";
import { useRef } from "react";
import {useState} from "react";
import {useEffect} from "react";
import Controls from "../components/Controls.jsx";
import Instructions from "../components/Instructions.jsx";
import WelcomeText from "../components/WelcomeText.jsx";
import PageCard from "../components/PageCard.jsx";
import { io } from "socket.io-client";


export default function SpeechPage() {

  const [messages, setMessages] = useState([])
  const [settings, setSettings] = useState({})
  const [prompt, setPrompt] = useState("")
  const sessionIdRef = useRef("");
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [time, setTime] = useState(20)
  const recognitionRef = useRef(null);

  const [isUserSpeaking, setIsUserSpeaking] = useState(false)

  console.log(messages)



  const socket = io("http://localhost:8080");

  const beginRecording = () => {
    setSettings({ ...settings, prompt: prompt });
    socket.emit("start-conversation", settings);
  };

  const AISpeaking = (text) => {
    return new Promise((resolve) => {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-MX";

      utterance.onend = () => {
        setTime(20);
        setIsTimerOn(false)
        resolve();
        

      };

      speechSynthesis.speak(utterance);
    });
  };
  

  const studentSpeaking = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "es-MX";
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    let finalTranscript = "";

    recognitionRef.current.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }
    };

    recognitionRef.current.onend = () => {
      if (finalTranscript.trim().length > 1) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            type: "user",
            content: finalTranscript.trim(),
          },
        ]);
        socket.emit("student-response", {
          studentMessage: finalTranscript.trim(),
          sessionId: sessionIdRef.current,
        });
      }
    };

    recognitionRef.current.start();
    setTime(20);
    setIsTimerOn(true); 
  };


  socket.on("conversation-started", async (data) => {
    sessionIdRef.current = data.sessionId;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "ai",
        content: data.aiMessage,
      },
    ]);
    await AISpeaking(data.aiMessage)
    studentSpeaking()
  });



  socket.on("ai-response", async (data) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "ai",
        content: data.aiMessage,
      },
    ]);
    await AISpeaking(data.aiMessage);
    studentSpeaking()
  } );

  socket.on("conversation-ended", async(data) => {
    setIsRecording(false)
  });

  
  useEffect(() => {
    if (!isTimerOn) return;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsTimerOn(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerOn]);


  
    return (
      <>
        <NavigationMenu />

        <div className="flex gap-4 bg-slate-300 ">
          <Controls gameType="speech" handlePrompt={setPrompt} gameSettings={setSettings}/>

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
              text={prompt.title}
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
                    {time}
                  </h3>
                  <p>Seconds to respond</p>

                  <button
                    className="block rounded-lg bg-purple-300 p-2 font-bold text-2xl text-center hover:bg-purple-400"
                    onClick={() => beginRecording()}
                  >
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