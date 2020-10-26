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
import playAudio from './../../functions/PlayAudio'
import shuffleAlternatives from './../../functions/ShuffleAlternatives'

// TYPINGS
import QuestionProps from '../../typings/QuestionProps'
import { RouteStackParamList } from 'typings/RouteParams'

// VARIABLES
let isCorrect: boolean | undefined
let isIncorrect: boolean | undefined

export default function QuizScreen({ navigation }: RouteStackParamList<'Quiz'>) {
  const [questionId, setQuestionId] = useState<number>(0)
  const [user, setUser] = useState<object>()
  const [clickedButton, setClickedButton] = useState<number | undefined>(undefined)
  const [question, setQuestion] = useState<QuestionProps | any>({})
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [level, setLevel] = useState<string>('Not set')
  const [audio, setAudio] = useState<boolean>(false)


  // TODO: isCorrect / isIncorrect - Try to solve it using just one state.
  // TODO: Use useContext for user instead of fetching current user on all screens

  // Fetches user from database

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user)
      }
    })
  }, [user, setUser])

  // Fetches questions from database

  useEffect(() => {
    isCorrect = false
    isIncorrect = false
    setAudio(true)
    const database = firebase.database()
    database
      .ref(`/questions/${questionId}`)
      .once('value')
      .then((dataSnapshot) => {
        setQuestion(dataSnapshot.toJSON())

        if (dataSnapshot.toJSON() == null) {
          setQuizCompleted(true)
        }
      })
  }, [questionId])


  // Checks if answer is correct

  const checkAnswer = (selectedAnswer: string) => {
    if (selectedAnswer == question.answer) {
      isCorrect = true
      setTimeout(() => {
        setQuestionId(questionId + 1)
      }, 750)
    }

    // Checks if answer is incorrect, a vibration should go off

    if (selectedAnswer != question.answer) {
      isIncorrect = true
      Vibration.vibrate()
      setTimeout(() => {
        setQuestionId(questionId + 1)
        Vibration.cancel()
      }, 750)
    }
  }

  // Checks index on the button that is clicked (saved)

  const saveButtonClick = (clickedId: number) => {
    setClickedButton(clickedId)
  }

  // This is a loading screen for when the questions are being printed

  if (question == undefined && quizCompleted == false) {
    return (
      <Layout>
        <Heading>Loading...</Heading>
      </Layout>
    )
  }

  // A layout with a <Counter> that displays your points

  if (quizCompleted) {
    return (
      <Layout>
        <MainHeading>Grattis....</MainHeading>
        <Counter />
        <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
      </Layout>
    )
  }

  // Here you can choose the how difficult you want the quiz to be

  if (level == 'Not set') {
    return (
      <Layout>
        <Heading style={{ marginBottom: '20%' }}>Välj svårighetsgrad</Heading>
        <Button text="Normal" handleClick={() => setLevel('Normal')} />
        <Button text="Hets" handleClick={() => setLevel('Hard')} />
        <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
      </Layout>
    )
  }

  // If you choose the level "Hard", an audio file will begin playing
  if (level == 'Hard') {
    // playAudio(audio)
  }

  // This is the <Layout> you get when playing the quiz

  return (
    <Layout>
      <Counter level={level} quizCompleted={quizCompleted} isCorrect={isCorrect} isIncorrect={isIncorrect} />
      <QuestionContainer questionNumber={`Fråga ${questionId + 1}`} question={question.question} />
      {shuffleAlternatives(question.alternatives).map(([key, value]: [string, any], buttonId: number) => {
        return (
          <Button
            isCorrect={clickedButton === buttonId && isCorrect}
            isIncorrect={clickedButton === buttonId && isIncorrect}
            key={buttonId}
            handleClick={() => {
              checkAnswer(value)
              saveButtonClick(buttonId)
            }}
            text={value}
          />
        )
      })}
      <StatusBar style="auto" />
    </Layout>
  )
}
