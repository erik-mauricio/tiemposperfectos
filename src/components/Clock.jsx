import {useEffect, useState} from "react";

export function Clock({duration}) {
    const [time, setTime] = useState(parseInt(duration));
    const[isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (time <= 0){
            setIsActive(false);
            return;
        }

        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <div className={"bg-red-500 border-red-black text-white text-center max-w-2xs mx-auto p-2 rounded-md"}>
            <h1>{
                isActive ? "Time: " + time : "Time's up!"
            }</h1>

        </div>
    );
}