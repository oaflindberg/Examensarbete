import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { StyledText } from './Style'
import QuestionContainer from './../../components/QuestionContainer/QuestionContainer'
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import firebase from './../../firebase/firebase'
import QuestionProps from '../../typings/QuestionProps'

export default function QuizScreen() {
  const [index, setIndex] = useState<number>(0)
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>()
  const [isIncorrect, setIsIncorrect] = useState<boolean | undefined>()
  const [question, setQuestion] = useState<QuestionProps | any>()
  const database = firebase.database()

  useEffect(() => {
    database
      .ref(`/questions/${index}`)
      .once('value')
      .then((dataSnapshot) => {
        let questions = dataSnapshot.toJSON()
        setIsCorrect(false)
        setIsIncorrect(false)
        setQuestion(questions)
      })
  }, [index])

  const [loaded, error] = useFonts({
    Akkurat: require('./../../assets/fonts/Akkurat.ttf'),
  })

  if (!loaded) {
    return null
  }

  const checkAnswer = (pressed: string, answer: string) => {
    if (pressed == answer) {
      setIsCorrect(true)
      if (index < 1) {
        setTimeout(() => {
          setIndex(index + 1)
        }, 750)
      } else {
        setTimeout(() => {
          setIndex(0)
        }, 750)
      }
    } else {
      setIsIncorrect(true)
      if (index < 1) {
        setTimeout(() => {
          setIndex(index + 1)
        }, 750)
      } else {
        setTimeout(() => {
          setIndex(0)
        }, 750)
      }
    }
  }

  if (question == undefined) {
    return (
      <Layout>
        <StyledText>Loading...</StyledText>
      </Layout>
    )
  }

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
              correct={isCorrect}
              incorrect={isIncorrect}
              key={i}
              handleClick={() => {
                checkAnswer(value, question.answer)
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
