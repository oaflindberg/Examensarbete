// REACT & EXPO
import React, { useEffect, useState, useContext } from 'react'

// COMPONENTS & STYLES
import { CounterText } from './Style'
import PointsContext from './../../context/PointsContext'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'

interface CounterProps {
  correct?: boolean | null
  quizCompleted?: boolean | undefined
  level?: string | undefined
}


function writeUserData(userId: string, highscore: any) {
  firebase.database().ref('/highscores/').push({
    highscore : highscore,
    user : userId
  });  
}

  const Counter = ({ correct, quizCompleted, level }: CounterProps) => {
  const [points, setPoints] = useContext(PointsContext)
  const [time, setTime] = useState<number>(30)
  
  let user = firebase.auth().currentUser


if (user !== null && quizCompleted == undefined) {
  writeUserData(user.uid, points)
}

  useEffect(() => {
    if (time >= 0 && correct == true) {
      setPoints(points + time * 150)
      setTimeout(() => {
        setTime(30)
      }, 750)
      console.log('ETT')
    }
    console.log('coorecctte', time <= 0 && !correct)
    if (time <= 0 && correct == true) {
      setPoints(points + 150)
      setTimeout(() => {
        setTime(30)
      }, 750)
      console.log('TVÅ')
    }

    if (quizCompleted == undefined) {
      return
    }

    const timer = () => setTime(time - 1)

    if (level == "Hard") {
      let countDown = setInterval(timer, 600)
      if (time <= 0) {
        clearInterval(countDown)
      }
      return () => clearInterval(countDown)
    } else {
      let countDown = setInterval(timer, 1000)
      if (time <= 0) {
        console.log('TRE')
        clearInterval(countDown)
      }

      console.log("FYRA")

      return () => clearInterval(countDown)
    }
  }, [time])
 

  console.log(time)

  return (
    <>
      <CounterText quizCompleted={quizCompleted} correct={correct}>
        Poäng: {points}
      </CounterText>
      {level == "Hard" && (
        <CounterText
          quizCompleted={quizCompleted}
          correct={correct}
          level={"Hard"}
        >
          {time}
        </CounterText>
      )}
    </>
  )
}

export default Counter
