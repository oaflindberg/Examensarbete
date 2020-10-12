import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import QuestionContainer from './../../components/QuestionContainer/QuestionContainer'
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import firebase from './../../firebase/firebase'

export default function QuizScreen() {
  const [index, setIndex] = useState<number>(0)
  const [question, setQuestion] = useState<object>()
  const database = firebase.database()

  useEffect(() => {
    database
      .ref(`/questions/${index}`)
      .once('value')
      .then((dataSnapshot) => {
        setQuestion(dataSnapshot)
      })
  }, [])

  // console.log(question.question)

  const [loaded, error] = useFonts({
    Akkurat: require('./../../assets/fonts/Akkurat.ttf'),
  })

  if (!loaded) {
    return null
  }

  const checkAnswer = (pressed: string, answer: string) => {
    if (pressed == answer) {
      // SINCES THERE*S ONLY TWO QUESTIONS RIGHT NOW, I'VE SET A LIMIT HERE
      if (index < 1) {
        setIndex(index + 1)
      } else {
        setIndex(0)
      }
    } else {
      console.log('wrong')
    }
  }

  return (
    <Layout>
      <QuestionContainer
        questionNumber={`Fråga ${index + 1}`}
        question={'hej'}
      />
      {/* {Object.entries(questions[index].alternatives).map(([key, value], i) => {
        return (
          <Button
            key={i}
            handleClick={() => {
              checkAnswer(value, questions[index].answer)
            }}
            text={value}
          />
        )
      })}
      <StatusBar style="auto" /> */}
    </Layout>
  )
}
