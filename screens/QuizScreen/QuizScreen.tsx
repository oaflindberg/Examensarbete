//REACT & EXPO
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Vibration } from 'react-native'

// COMPONENTS & STYLES
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer'
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import Counter from '../../components/Counter/Counter'
import { MainHeading, Heading } from '../../styles/Text'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'

// TYPINGS
import QuestionProps from '../../typings/QuestionProps'
import { RouteStackParamList } from 'typings/RouteParams'

export default function QuizScreen({
  navigation,
}: RouteStackParamList<'Quiz'>) {
  const [index, setIndex] = useState<number>(0)
  const [user, setUser] = useState<object>()
  const [isCorrect, setIsCorrect] = useState<boolean | null>()
  const [isIncorrect, setIsIncorrect] = useState<boolean | null>()
  const [clickedButton, setClickedButton] = useState<number | undefined>()
  const [question, setQuestion] = useState<QuestionProps | any>()
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [hardMode, setHardMode] = useState<boolean | undefined>()

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
      Vibration.vibrate()
      setTimeout(() => {
        setIndex(index + 1)
        Vibration.cancel()
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
        <Heading>Loading...</Heading>
      </Layout>
    )
  }

  if (quizCompleted) {
    // THIS WILL BE HIGHSCORE IN THE FUTURE

    //  function writeUserData(userId:string, highscore:string) {
    //    firebase.database().ref('/highscore/').set({
    //      highscore : highscore,
    //      user : userId
    //    });
    //  }

    // writeUserData(user.uid, points);

    return (
      <Layout>
        <MainHeading>Grattis....</MainHeading>
        <Counter />
        <Button
          handleClick={() => navigation.navigate('Home')}
          text="Tillbaka"
        />
      </Layout>
    )
  }

  const questionsArray = Object.entries(question.alternatives).sort(
    () => Math.random() - 0.5
  )

  if (hardMode == undefined) {
    return (
      <Layout>
        <Heading style={{ marginBottom: '20%' }}>Välj svårighetsgrad</Heading>
        <Button text="Normal" handleClick={() => setHardMode(false)} />
        <Button text="Hets" handleClick={() => setHardMode(true)} />
      </Layout>
    )
  }

  return (
    <Layout>
      <Counter
        hardMode={hardMode}
        quizCompleted={quizCompleted}
        correct={isCorrect}
      />
      <QuestionContainer
        questionNumber={`Fråga ${index + 1}`}
        question={question.question}
      />
      {questionsArray.map(([key, value]: [string, any], i: number) => {
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
      })}
      <StatusBar style="auto" />
    </Layout>
  )
}
