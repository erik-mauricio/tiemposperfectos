import NavigationMenu from "../components/NavigationMenu.jsx";
import { Link } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { ChevronDown } from "lucide-react";
import PageDescription from "../components/PageDescription.jsx";
import { BookOpen } from "lucide-react";

export default function HomePage() {
    return (
      <>
        <NavigationMenu />
        <div className="min-h-screen text-slate-800 w-full mx-auto ">
          <div className="bg-slate-800 max-w-full p-4 text-white space-y-4 w-full">
            <h1 className="text-white text-5xl font-bold">
              Learning Spanish? Getting ready for AP Tests
            </h1>

            <p className="text-xl">
              Use TiemposPefectos to master grammar conjugations, reading
              comprehension, and practice live conversations for accelerated
              Spanish fluency.
            </p>

            <div className="flex gap-2">
              <div className="border-2 rounded-lg p-3">
                <button className="flex gap-2">
                  Ready to Learn <ChevronDown />
                </button>
              </div>

              <button className="border-2 rounded-xl p-3">Watch Demo</button>
            </div>

            <div className="border-3 border-slate-500 rounded-md p-4 bg-slate-300 space-y-2">
              <div className="flex gap-2">
                <CircleCheckBig />
                <p className="text-slate-800 text-lg">
                  Adaptive difficulty levels
                </p>
              </div>

              <div className="flex gap-2">
                <CircleCheckBig />
                <p className="text-slate-800">Adaptive difficulty levels</p>
              </div>

              <div className="flex gap-2">
                <CircleCheckBig />
                <p className="text-slate-800">Adaptive difficulty levels</p>
              </div>

              <div className="flex gap-2">
                <CircleCheckBig />
                <p className="text-slate-800">Adaptive difficulty levels</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-300 max-w-full p-4 text-center space-y-2">
            <h2 className="text-4xl font-bold">Choose Your Adventure</h2>

            <p>
              Learn from three different modolues each with customizability and
              interactivty from quizzes to real-time conversation practice.{" "}
            </p>

            <PageDescription
              title={"Grammar"}
              titleIcon={<BookOpen />}
              text={`Master Spanish grammar  conjugation with
                fill-in-the-blank exercises that personalized to desired level of difficulty.`}
              details={[
                "Multiple tense options available",
                "Instant accuracy score",
                "Customizable question sets (5-15)",
              ]}
              bgColor={"#e74d3ce3"}
            ></PageDescription>

            <PageDescription
              title={"Speech"}
              titleIcon={<BookOpen />}
              text={`Gain confidence in speaking abilites through real-tme Spanish conversations .`}
              details={[
                "Simulates AP Spanish speaking conversations with 20 second intervals",
                "AI conversation partners",
                "Topic filtering or live search to find what YOU want to practice speaking about",
              ]}
              bgColor={"oklch(70.2% 0.183 293.541)"}
            ></PageDescription>

            <PageDescription
              title={"Reading"}
              titleIcon={<BookOpen />}
              text={`Master Spanish grammar  conjugation with
                fill-in-the-blank exercises that personalized to desired level of difficulty.`}
              details={[
                "Multiple tense options available",
                "Instant accuracy score",
                "Customizable question sets (5-15)",
              ]}
              bgColor={"oklch(70.7% 0.165 254.624)"}
            ></PageDescription>
          </div>

          <div className="bg-slate-800 max-w-full p-4 text-white text-center min-h-full">
            <p className="text-white">Developed by Erik Mauricio</p>
            <p>Github</p>
          </div>
        </div>
      </>
    );
}