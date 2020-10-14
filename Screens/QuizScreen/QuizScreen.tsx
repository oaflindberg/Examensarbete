//REACT & EXPO
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

// COMPONENTS & STYLES
import QuestionContainer from './../../components/QuestionContainer/QuestionContainer'
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import { StyledText } from './Style'

// FUNCTIONS & FIREBASE
import calculateScore from '../../utils/SetScore'
import firebase from './../../firebase/firebase'

// TYPINGS
import QuestionProps from '../../typings/QuestionProps'

export default function QuizScreen() {
  const [index, setIndex] = useState<number>(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>()
  const [isIncorrect, setIsIncorrect] = useState<boolean | null>()
  const [clickedButton, setClickedButton] = useState<number | undefined>()
  const [question, setQuestion] = useState<QuestionProps | any>()

  const database = firebase.database()
  useEffect(() => {
    database
      .ref(`/questions/${index}`)
      .once('value')
      .then((dataSnapshot) => {
        let questions = dataSnapshot.toJSON()
        setIsCorrect(false)
        setQuestion(questions)
        setClickedButton(undefined)
      })
  }, [index])

  const [loaded, error] = useFonts({
    Akkurat: require('./../../assets/fonts/Akkurat.ttf'),
  })

  if (!loaded) {
    return null
  }

  const checkAnswer = (selectedAnswer: string) => {
    if (selectedAnswer == question.answer) {
      setIsCorrect(true)
      if (index < 2) {
        setTimeout(() => {
          setIndex(index + 1)
        }, 750)
      } else {
        setTimeout(() => {
          setIndex(0)
        }, 750)
      }
    } else if (selectedAnswer != question.answer) {
      setIsIncorrect(true)
      if (index < 2) {
        setTimeout(() => {
          setIndex(index + 1)
        }, 750)
      } else {
        setTimeout(() => {
          setIndex(0)
        }, 750)
      }
    } else {
      setIsCorrect(undefined)
      setIsIncorrect(undefined)
    }
  }

  const saveButtonClick = (buttonValue: string, index: number) => {
    if (buttonValue == question.answer) {
      setClickedButton(index)
    } else {
      setClickedButton(index)
    }
  }

  if (question == undefined) {
    return (
      <Layout>
        <StyledText>Loading...</StyledText>
      </Layout>
    )
  }
  console.log(calculateScore(question, isCorrect, isIncorrect))

  return (
    <Layout>
      <QuestionContainer
        questionNumber={`Fråga ${index + 1}`}
        question={question.question}
      />
      {Object.entries(question.alternatives).map(
        ([key, value]: [string, any], i: number) => {
          return (
            <Button
              correct={clickedButton === i && isCorrect}
              incorrect={clickedButton === i && isIncorrect}
              key={i}
              handleClick={() => {
                checkAnswer(value)
                saveButtonClick(value, i)
              }}
              text={value}
            />
          )
        }
      )}
      <StatusBar style="auto" />
    </Layout>
  )
}
