//REACT & EXPO
import React, { useState, useEffect, useContext } from 'react'
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
let message: string

// let randomFirstQuestion = Math.floor(Math.random() * 13)

export default function QuizScreen({ navigation }: RouteStackParamList<'Quiz'>) {
  const [questionId, setQuestionId] = useState<number>(0)
  const [clickedButton, setClickedButton] = useState<number | undefined>(undefined)
  const [question, setQuestion] = useState<QuestionProps | any>()
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [level, setLevel] = useState<string>('Not set')
  const [numberOfQuestions, setNumberOfQuestions] = useState<number | undefined>(undefined)
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  // const [length, setLength] = useState<number>(15)
  let { points, setPoints } = useContext(PointsContext)


  // Sets message that's show after quiz completed based on amount of points

  if (numberOfQuestions != undefined) {
    switch (true) {
      case points == numberOfQuestions * 30 * 150:
        message = 'KINGEN'
        break
      case points >= numberOfQuestions * 15 * 150:
        message = 'WÖÖÖ'
        break
      case points <= numberOfQuestions * 15 * 150 && points > 0:
        message = 'BÄTTRE KAN DU'
        break
      case points === 0:
        message = 'SOPA!'
        break
    }
  }

  // Fetches all questions from database

  useEffect(() => {
    const database = firebase.database()
    database
      .ref(`/questions/`)
      .once('value')
      .then((dataSnapshot) => {
        let data = Object.values(dataSnapshot.toJSON())
        let allQuestions = data.map((q: any) => {
          let shuffledAlternatives = shuffleAlternatives(q.alternatives)
          delete q.alternatives
          q.alternatives = shuffledAlternatives
          return q
        })
        setPoints(0)
        setQuestion(allQuestions.sort(() => Math.random() - 0.5))
        if (numberOfQuestions != undefined) {
          let index = Math.floor(Math.random() * numberOfQuestions)
          setQuestionIndex(index)
        }
      })
  }, [])
 
  // Get next question after the previous has been answered

  useEffect(() => {
    setTimeout(() => {
        // isCorrect = undefined
      setQuestionId(questionId + 1)
      if (question != undefined && numberOfQuestions != undefined) {
        let index = Math.floor(Math.random() * numberOfQuestions)
        setQuestionIndex(index)
      }
    }, 750)
    if (numberOfQuestions < 0) {
      setQuizCompleted(true)
    }
    return() => (isCorrect = undefined)
  }, [isCorrect])

  const removeQuestion = (arr: object[]) => {
    arr.splice(questionIndex, 1)
  }


  // Checks if answer is correct

  const checkAnswer = (selectedAnswer: string | unknown) => {
    if (selectedAnswer == question[questionIndex].answer) {
      isCorrect = true
      if (question != null || question != undefined) {
        setNumberOfQuestions(numberOfQuestions - 1)
        setTimeout(() => {
          removeQuestion(question)
        }, 750)
      }
    }

    // Checks if answer is incorrect. A vibration should go off

    if (selectedAnswer != question[questionIndex].answer) {
      isCorrect = false
      Vibration.vibrate()
      if (question != null || question != undefined) {
      setNumberOfQuestions(numberOfQuestions - 1)
      setTimeout(() => {
        removeQuestion(question)
        Vibration.cancel()
        }, 750)
      }
    } 
  }

  // Checks index on the button that is clicked (saved)

  const saveButtonClick = (clickedId: number) => {
    setClickedButton(clickedId)
  }

  // A loading screen for when the questions are being printed

  if (question == undefined && quizCompleted == false) {
    return (
      <Layout>
        <Heading>Loading...</Heading>
      </Layout>
    )
  }

  // A layout that displays your points

  if (quizCompleted) {
    return (
      <Layout>
        <MainHeading>{message}</MainHeading>
        <Counter />
        <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
        <Button handleClick={() => shareOnTwitter(points)} text="Dela på twitter" />
      </Layout>
    )
  }

  // Choose the how difficult you want the quiz to be

  if (level == 'Not set' && numberOfQuestions == undefined) {
    return (
      <Layout>
        <Heading style={{ marginBottom: '20%' }}>Välj svårighetsgrad</Heading>
        <Button text="Normal" handleClick={() => setLevel('Normal')} />
        <Button text="Hets" handleClick={() => setLevel('Hard')} />
        <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
      </Layout>
    )
  }

  // Choose how many questions you want to answer

  if (numberOfQuestions == undefined) {
    return (
      <Layout>
        <Heading style={{ marginBottom: '20%' }}>Välj quizlängd</Heading>
        <Button text="15" handleClick={() => setNumberOfQuestions(14)} />
        <Button text="25" handleClick={() => setNumberOfQuestions(24)} />
        <Button text="50" handleClick={() => setNumberOfQuestions(49)} />
        <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
      </Layout>
    )
  }

  // If you choose the level "Hard", an audio file will begin playing
  if (level == 'Hard') {
    // playAudio(quizCompleted)
  }

  // Quiz view
  return (
    <Layout>
      <Counter level={level} quizCompleted={quizCompleted} isCorrect={isCorrect} />
      {question[questionIndex].question != undefined ? (
      <QuestionContainer
        questionNumber={`Fråga ${questionId}`}
        question={question[questionIndex].question}
      />
      ) : (
        <Heading>Loading...</Heading>
      )}
      {question[questionIndex].alternatives != undefined ? (
        question[questionIndex].alternatives.map((value: string, buttonId: number) => {
          return (
            <Button
              isCorrect={isCorrect && clickedButton == buttonId}
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
    </Layout>
  )
}
