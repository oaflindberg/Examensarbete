// REACT & EXPO
import React, { useEffect, useState, useContext } from 'react'

// COMPONENTS & STYLES
import { CounterText } from './Style'
import PointsContext from './../../context/PointsContext'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'
import saveHighscore from './../../functions/SaveHighscore'

interface CounterProps {
  isCorrect?: boolean | null
  quizCompleted?: boolean | undefined
  level?: string
  numberOfQuestions?: number
}

const Counter = ({ isCorrect, quizCompleted, level, numberOfQuestions }: CounterProps) => {
  const { points, setPoints } = useContext(PointsContext)
  const [time, setTime] = useState<number>(30)
  const [test, setTest] = useState<boolean>(false)

  // Fetches current user and uploads final score to database
  useEffect(() => {
    let user = firebase.auth().currentUser
    if (user != null && quizCompleted == undefined) {
      saveHighscore(firebase, user.uid, points, numberOfQuestions)
    }
  }, [quizCompleted])

  useEffect(() => {
    // If time remaining is more than 0
    if (time >= 0 && isCorrect) {
      setTimeout(() => {
        setPoints(points + time * 150)
        setTime(30)
      }, 520)
    }

    // If time remaining is 0
    if (time <= 0 && isCorrect) {
      setTimeout(() => {
        setPoints(points + 150)
        setTime(30)
      }, 520)
    }

    // If incorrect answer
    if (isCorrect == false) {
      setTimeout(() => {
        setTime(30)
      }, 520)
    }

    // If all questions has been answered
    if (quizCompleted == undefined) {
      return
    }

    const timer = () => setTime(time - 1)

    // If game mode is set to hard set interval to count down faster, else normal countdown speed.
    if (level == 'Hard') {
      let countDown = setInterval(timer, 600)
      // If time remaining is 0 clear interval
      if (time <= 0) {
        clearInterval(countDown)
      }

      return () => clearInterval(countDown)
    } else {
      let countDown = setInterval(timer, 1000)
      // If time remaining is 0 clear interval
      if (time <= 0) {
        clearInterval(countDown)
      }
      return () => clearInterval(countDown)
    }
  }, [time, isCorrect])

  if (quizCompleted == undefined) {
    setTimeout(() => {
      setTest(true)
    }, 500)
    return <>{!test ? <></> : <CounterText>Poäng: {points}</CounterText>}</>
  }

  return (
    <>
      <CounterText quizCompleted={quizCompleted} isCorrect={isCorrect}>
        Poäng: {points}
      </CounterText>
      {level == 'Hard' && (
        <CounterText quizCompleted={quizCompleted} isCorrect={isCorrect} level={'Hard'}>
          {time}
        </CounterText>
      )}
    </>
  )
}

export default Counter
