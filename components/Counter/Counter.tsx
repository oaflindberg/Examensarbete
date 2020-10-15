import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyledCounter } from "./Style";

interface CounterProps {
    correct?: boolean | null
    incorrect?: boolean | null
}


const Counter = ({
    correct,
    incorrect
}: CounterProps) => {
    const [points, setPoints] = useState<any>(0);
    
    let endTime = Math.floor(Date.now() + 22000)
    useEffect(() => {
        const interval = setInterval(() => {
            let startTime = Date.now()
            let timeElapsed = Math.floor((endTime - startTime) / 1000)
            
            if (correct == true) {
                setPoints(points + Math.floor(timeElapsed * 125))
                endTime = Math.floor(Date.now() + 22000)
                clearInterval(interval)
            }
            if (incorrect == true) {
                setPoints(points + 0)
                endTime = Math.floor(Date.now() + 22000)
                clearInterval(interval)
            }
            if (timeElapsed <= 0 && correct == true) {
                setPoints(points + 125)
                endTime = Math.floor(Date.now() + 22000)
                clearInterval(interval)
            }
            console.log(endTime)
            console.log(timeElapsed)
        }, 1000);
        return () => clearInterval(interval);
    }, [points])
    return ( 
        <StyledCounter
        correct={correct}
        incorrect={incorrect}
        >{points}</StyledCounter>
       
    )
}

export default Counter;