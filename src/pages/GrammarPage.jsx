import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";
import {useState} from "react";
import {useEffect} from "react";
import Controls from "../components/Controls.jsx";


export default function GrammarPage() {
    const [conjugations, setConjugations] = useState([]);
    const [userResponses, setUserResponses] = useState({});
    const [results, setResults] = useState({});



    function handleResponse(){
        const result = {}
        for(let i = 0; i < conjugations.length; i++){
            result[i] = {
                isCorrect: conjugations[i].answer === userResponses[i],
                userResponse: userResponses[i],
                correctResponse: conjugations[i].answer
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

        <NavigationMenu/>

        <div className="flex gap-4 bg-slate-300 ">
          <Controls/>
        </div>
      </>
    );


}