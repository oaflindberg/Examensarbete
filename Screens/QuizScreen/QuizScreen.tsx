//REACT & EXPO
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

// COMPONENTS & STYLES
import QuestionContainer from './../../components/QuestionContainer/QuestionContainer'
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import Counter from './../../components/Counter/Counter'
import { StyledText } from './Style'

// FUNCTIONS & FIREBASE
import firebase from './../../firebase/firebase'

// TYPINGS
import QuestionProps from '../../typings/QuestionProps'
import { RouteStackParamList } from 'typings/RouteParams'
import { useCardAnimation } from '@react-navigation/stack'

export default function QuizScreen({
  navigation,
}: RouteStackParamList<'Quiz'>) {
  const [index, setIndex] = useState<number>(0)
  const [user, setUser] = useState<any>()
  const [isCorrect, setIsCorrect] = useState<boolean | null>()
  const [isIncorrect, setIsIncorrect] = useState<boolean | null>()
  const [clickedButton, setClickedButton] = useState<number | undefined>()
  const [question, setQuestion] = useState<QuestionProps | any>()
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user)
    }
  })

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

        if (questions == null) {
          setQuizCompleted(true)
        }
      })
  }, [index])

  const checkAnswer = (selectedAnswer: string) => {
    if (selectedAnswer == question.answer) {
      setIsCorrect(true)
      setTimeout(() => {
        setIndex(index + 1)
      }, 750)
    }
    if (selectedAnswer != question.answer) {
      setIsIncorrect(true)
      setTimeout(() => {
        setIndex(index + 1)
      }, 750)
    }
  }

  const saveButtonClick = (buttonValue: string, index: number) => {
    if (buttonValue == question.answer) {
      setClickedButton(index)
    } else {
      setClickedButton(index)
    }
  }

  if (question == undefined && quizCompleted == false) {
    return (
      <Layout>
        <StyledText>Loading...</StyledText>
      </Layout>
    )
  }

  if (quizCompleted) {

    //  function writeUserData(userId:string, highscore:string) {
    //    firebase.database().ref('/questions/').set({
    //      highscore : highscore,
    //      user : userId
    //    });
    //  }

    // writeUserData(user.uid, points);

    return (
      <Layout>
        <StyledText>Grattis....</StyledText>
        <Counter />
        <Button
          handleClick={() => navigation.navigate('Home')}
          text="Tillbaka"
        />
      </Layout>
    )
  }

  return (
    <Layout>
      <Counter quizCompleted={quizCompleted} correct={isCorrect} />
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
