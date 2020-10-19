import React, { useEffect, useState, useContext } from 'react'
import { CounterText } from './Style'
import PointsContext from './../../context/PointsContext'

interface CounterProps {
  correct?: boolean | null
  quizCompleted?: boolean | undefined
}

const Counter = ({ correct, quizCompleted }: CounterProps) => {
  const [points, setPoints] = useContext(PointsContext)
  const [time, setTime] = useState<number>(20)
  const timer = () => setTime(time - 1)

  useEffect(() => {
    if (time >= 0 && correct == true) {
      setPoints(points + time * 125)
      setTimeout(() => {
        setTime(20)
      }, 750)
    }

    if (time <= 0 && correct == true) {
      setPoints(points + 125)
      setTimeout(() => {
        setTime(20)
      }, 750)
    }

    if (quizCompleted == undefined) {
      return
    }

    const interval = setInterval(timer, 1000)
    return () => clearInterval(interval)
  }, [time])

  return (
    <CounterText quizCompleted={quizCompleted} correct={correct}>
      Poäng: {points}
    </CounterText>
  )
}

export default Counter
