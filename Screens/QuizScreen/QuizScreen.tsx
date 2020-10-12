import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import QuestionContainer from './../../components/QuestionContainer/QuestionContainer'
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import firebase from './../../firebase/firebase'
import { CheckBox, Text } from 'react-native'

export default function QuizScreen() {
  const [index, setIndex] = useState<number>(0)
  const [question, setQuestion] = useState<any>()
  const database = firebase.database()

  useEffect(() => {
    database
      .ref(`/questions/${index}`)
      .once('value')
      .then((dataSnapshot) => {
        let questions = dataSnapshot.toJSON();
        setQuestion(questions)
      })
  }, [index])

  // console.log(question.question)

  const [loaded, error] = useFonts({
    Akkurat: require('./../../assets/fonts/Akkurat.ttf'),
  })

  if (!loaded) {
    return null
  }

  const checkAnswer = (pressed: any, answer: any) => {
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

  if (question === null || question === undefined) {
    return (
      <Layout>
        <Text>Loading!</Text>
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
          wrong
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
