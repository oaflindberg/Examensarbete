//REACT & EXPO
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Vibration } from 'react-native'

// COMPONENTS & STYLES
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer'
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import Counter from '../../components/Counter/Counter'
import { MainHeading, Heading } from '../../styles/Text'
import PointsContext from './../../context/PointsContext'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'
import playAudio from './../../functions/PlayAudio'
import shuffleAlternatives from './../../functions/ShuffleAlternatives'
import shareOnTwitter from './../../functions/ShareOnTwitter'

// TYPINGS
import QuestionProps from '../../typings/QuestionProps'
import { RouteStackParamList } from 'typings/RouteParams'

// VARIABLES
let isCorrect: boolean | undefined = undefined

export default function QuizScreen({ navigation }: RouteStackParamList<'Quiz'>) {
  const [questionId, setQuestionId] = useState<number>(0)
  const [clickedButton, setClickedButton] = useState<number | undefined>(undefined)
  const [question, setQuestion] = useState<QuestionProps | any>()
  const [alternatives, setAlternatives] = useState<any>()
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [level, setLevel] = useState<string>('Not set')
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  let { points } = useContext(PointsContext)

  // Fetches all questions from database
  useEffect(() => {
    const database = firebase.database()
    database
      .ref(`/questions/`)
      .once('value')
      .then((dataSnapshot) => {
        if (dataSnapshot.toJSON() == null) {
          setQuizCompleted(true)
        } else {
          setQuestion(Object.entries(dataSnapshot.toJSON()))
          if (question != undefined) {
            let index = Math.floor(Math.random() * question.length)
            setQuestionIndex(index)
          }
        }
      })
  }, [])

  // Get next question after the previous has been answered
  useEffect(() => {
    setTimeout(() => {
      isCorrect = undefined
      setQuestionId(questionId + 1)
      if (question != undefined) {
        let index = Math.floor(Math.random() * question.length)
        setQuestionIndex(index)
      }
    }, 750)
    if (question.length < 1) {
      setQuizCompleted(true)
    }
  }, [isCorrect])

  console.log(questionIndex)

  const removeQuestion = (arr: object[]) => {
    arr.splice(questionIndex, 1)
  }

  // Checks if answer is correct

  console.log(question)

  const checkAnswer = (selectedAnswer: string | unknown) => {
    if (selectedAnswer == question[questionIndex].answer) {
      isCorrect = true
      if (question != null || question != undefined) {
        setTimeout(() => {
          removeQuestion(question)
        }, 750)
      }
    }

    // Checks if answer is incorrect, a vibration should go off

    if (selectedAnswer != question[questionIndex].answer) {
      isCorrect = false
      Vibration.vibrate()
      setTimeout(() => {
        if (question != null || question != undefined) {
          removeQuestion(question)
        }
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
        <Button handleClick={() => shareOnTwitter(points)} text="Dela på twitter" />
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
    // playAudio(quizCompleted)
  }

  // This is the <Layout> you get when playing the quiz
  return (
    <Layout>
      <Counter level={level} quizCompleted={quizCompleted} isCorrect={isCorrect} />
      <QuestionContainer questionNumber={`Fråga ${questionId}`} question={question[questionIndex][1].question} />
      {question[questionIndex][1].alternatives != undefined ? (
        Object.values(question[questionIndex][1].alternatives).map((value: unknown, buttonId: number) => {
          return (
            <Button
              isCorrect={isCorrect && clickedButton === buttonId}
              key={buttonId}
              handleClick={() => {
                checkAnswer(value)
                saveButtonClick(buttonId)
              }}
              text={value}
            />
          )
        })
      ) : (
        <Heading>Loading...</Heading>
      )}
      <StatusBar style="auto" />
    </Layout>
  )
}
