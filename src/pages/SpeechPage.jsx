import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Controls from "../components/Controls.jsx";
import Instructions from "../components/Instructions.jsx";
import WelcomeText from "../components/WelcomeText.jsx";
import { Button } from "@/components/ui/button";
import { CONTROL_CONFIG } from "../constants/controlConfig";
import { useGameControls } from "../hooks/useGameControls";

const ACCENT_COLOR = "oklch(0.6 0.15 300)";
const BUBBLE_COLOR_BY_TYPE = {
  ai: "oklch(0.92 0.05 300)",
  user: "oklch(0.92 0.05 210)",
};

export default function SpeechPage() {
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({});
  const [prompt, setPrompt] = useState({});
  const sessionIdRef = useRef("");
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [time, setTime] = useState(20);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const socketRef = useRef(null);
  const turnsRef = useRef(null);

  const controlConfig = CONTROL_CONFIG.speech;

  const { difficulty, topic, setDifficulty, setTopic, handleGenerate } = useGameControls({
    gameType: "speech",
    onPrompt: setPrompt,
    onGameSettings: setSettings,
  });

  const fields = controlConfig.fields.map((field) => ({
    ...field,
    value: topic,
    onChange: setTopic,
  }));

  const aiSpeaking = (text) =>
    new Promise((resolve) => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-MX";

      utterance.onend = () => resolve();
      speechSynthesis.speak(utterance);
    });

  const studentSpeaking = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || turnsRef.current >= 5) {
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "es-MX";
    recognitionRef.current.interimResults = true;

    let finalTranscript = "";

    recognitionRef.current.onresult = (event) => {
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const txt = event.results[index][0].transcript;
        if (event.results[index].isFinal) {
          finalTranscript += txt;
        }
      }
    };

    recognitionRef.current.onerror = () => {
      setIsTimerOn(false);
      if (socketRef.current) {
        socketRef.current.emit("student-response", {
          studentMessage: "",
          sessionId: sessionIdRef.current,
        });
      }
    };

    recognitionRef.current.onend = () => {
      turnsRef.current += 1;
      setIsTimerOn(false);

      if (finalTranscript.trim().length > 1) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            type: "user",
            content: finalTranscript.trim(),
          },
        ]);

        socketRef.current.emit("student-response", {
          studentMessage: finalTranscript.trim(),
          sessionId: sessionIdRef.current,
        });
      }
    };

    recognitionRef.current.start();
    setTime(20);
    setIsTimerOn(true);
  };

  const beginRecording = () => {
    setIsRecording(true);
    turnsRef.current = 0;

    const payload = { ...settings, prompt };
    socketRef.current.emit("start-conversation", payload);
  };

  const endRecording = () => {
    setIsRecording(false);
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    const socket = socketRef.current;

    socket.on("conversation-started", async (data) => {
      sessionIdRef.current = data.sessionId;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          type: "ai",
          content: data.aiMessage,
        },
      ]);
      await aiSpeaking(data.aiMessage);
      studentSpeaking();
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
      await aiSpeaking(data.aiMessage);

      if (turnsRef.current < 5) {
        studentSpeaking();
      } else {
        socket.emit("end-conversation", { sessionId: sessionIdRef.current });
      }
    });

    socket.on("conversation-ended", () => {
      setIsRecording(false);
    });

    return () => {
      socket.off("conversation-started");
      socket.off("ai-response");
      socket.off("conversation-ended");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isTimerOn) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsTimerOn(false);
          if (recognitionRef.current) {
            recognitionRef.current.stop();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerOn]);

  return (
    <>
      <NavigationMenu />

      <div className="flex gap-4 bg-muted min-h-screen">
        <Controls
          title={controlConfig.title}
          fields={fields}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          generateLabel={controlConfig.generateLabel}
          onGenerate={handleGenerate}
        />

        <div className="space-y-4 mt-2 p-4 w-full max-w-7xl mx-auto">
          <WelcomeText
            heading="Speech Practice"
            text="Use the panel on the left to choose a topic and difficulty level. We'll start a live conversation — listen to the prompt, respond out loud, and get instant feedback to build your speaking confidence."
          />

          <Instructions
            title="Live Conversation Practice"
            titleColor={ACCENT_COLOR}
            text={prompt.title}
          >
            <div className="space-y-2 flex-col justify-between">
              {messages.length > 0 &&
                messages.map((response, index) => (
                  <div
                    key={response.id}
                    style={{
                      display: "flex",
                      justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                    }}
                  >
                    <div
                      className="rounded-2xl border p-4 max-w-150"
                      style={{
                        backgroundColor: BUBBLE_COLOR_BY_TYPE[response.type],
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg capitalize">{response.type}</h3>
                        <p className="text-sm text-muted-foreground">{response.timestamp}</p>
                      </div>

                      <p className="text-base">{response.content}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-semibold">
                Congrats on finishing this practice session! Below is your feedback
              </h1>

              <h2 className="font-semibold text-xl mt-1">Feedback:</h2>
            </div>

            <div className="flex-col justify-items-center mt-4">
              <div className="flex-col p-5 border rounded-2xl justify-items-center max-w-150 min-w-100 align-middle space-y-3 bg-muted/50">
                <h3
                  className="flex items-center justify-center size-32 rounded-full text-white text-center font-bold text-5xl"
                  style={{ backgroundColor: ACCENT_COLOR }}
                >
                  {time}
                </h3>
                <p className="text-sm text-muted-foreground">Seconds to respond</p>

                {!isRecording && (
                  <Button
                    type="button"
                    onClick={beginRecording}
                    className="rounded-full px-6"
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    Start Recording
                  </Button>
                )}

                {isRecording && (
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={endRecording}
                      className="rounded-full px-6"
                      style={{ backgroundColor: ACCENT_COLOR }}
                    >
                      End Recording
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Question&apos;s content was generated by ChatGPT.
            </p>
          </Instructions>
        </div>
      </div>
    </>
  );
}
