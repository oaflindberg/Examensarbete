import React, { useEffect, useState } from "react"
import { CounterText } from "./Style"

interface CounterProps {
    correct?: any
    
}


const Counter = ({
    correct,
}: CounterProps) => {
    const [points, setPoints] = useState<any>(0)
    const [time, setTime] = useState<any>(20)

        const timer = () => setTime(time - 1)
        useEffect(() => {
            if (time >= 0 && correct == true) {
                    setPoints (points + (time * 125))
                    setTimeout(() => {
                      setTime(20)
                 }, 750)
            }

            if (time <= 0 && correct == true) {
                setPoints (points + 125)
                setTimeout(() => {
                    setTime(20)
                  }, 750)
            }
        const interval = setInterval(timer, 1000);
        return () => clearInterval(interval);
    }, [time])
    console.log(time)
    console.log(points)
    return ( 
        
        <CounterText
        correct={correct}
        >
            Poäng: {points}
        </CounterText>
            
       
    )
}

export default Counter