import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { StyledText } from './Style'
import QuestionContainer from './../../components/QuestionContainer/QuestionContainer'
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import firebase from './../../firebase/firebase'

export default function QuizScreen() {
  const [index, setIndex] = useState<number>(0)
  const [correct, setCorrect] = useState<boolean>(false)
  const [incorrect, setIncorrect] = useState<boolean>(false)
  const [question, setQuestion] = useState<any>()
  const database = firebase.database()

  useEffect(() => {
    database
      .ref(`/questions/${index}`)
      .once('value')
      .then((dataSnapshot) => {
        let questions = dataSnapshot.toJSON()
        setCorrect(false)
        setIncorrect(false)
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
      setCorrect(true)
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
      setIncorrect(true)
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

  if (question == undefined || question == null) {
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
      {Object.entries(question.alternatives).map(([key, value], i) => {
        return (
          <Button
            correct={correct}
            wrong={incorrect}
            key={i}
            handleClick={() => {
              checkAnswer(value, question.answer)
            }}
            text={value}
          />
        )
      })}
      <StatusBar style="auto" />
    </Layout>
  )
}
