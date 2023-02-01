import React, {useEffect, useState} from "react";


export default function Stopwatch(){
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    let interval = null; 

    useEffect(() => {
        if (isRunning){
            let startTime = Date.now() - time;
            interval = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return ()=> clearInterval(interval);
    },[isRunning, time]);

    const startTimer = () => {
        setIsRunning(true);
    }

    const  stopTimer = () => {
        setIsRunning(false);
    }
    const resetTimer = () => {
        setTime(0);
    }


    return (

        <div className="stopwatch">
          <h1>{time} ms</h1>
          <button onClick={isRunning ? stopTimer : startTimer} >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>
    )
}