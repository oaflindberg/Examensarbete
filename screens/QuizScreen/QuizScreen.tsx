//REACT & EXPO
import React, { useState, useEffect, useContext } from 'react'
import { Vibration } from 'react-native'

// COMPONENTS & STYLES
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer'
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import Counter from '../../components/Counter/Counter'
import { MainHeading, Heading } from '../../styles/Text'
import PointsContext from '../../context/PointsContext'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'
import shuffleAlternatives from '../../functions/ShuffleAlternatives'
import shareOnTwitter from '../../functions/ShareOnTwitter'
import removeQuestion from '../../functions/RemoveQuestion'

// TYPINGS
import QuestionProps from '../../typings/QuestionProps'
import { RouteStackParamList } from '../../typings/RouteParams'

// VARIABLES
let isCorrect: boolean | undefined = undefined
let questionAnswered: boolean = false
let message: string

export default function QuizScreen({ navigation }: RouteStackParamList<'Quiz'>) {
  const [questionId, setQuestionId] = useState<number>(0)
  const [clickedButton, setClickedButton] = useState<number | undefined>(undefined)
  const [question, setQuestion] = useState<QuestionProps[]>([])
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [level, setLevel] = useState<string>('Not set')
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(50)
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [finalScore, setFinalScore] = useState<boolean>(false)
  let { points, setPoints } = useContext(PointsContext)

  // Sets message that's show after quiz completed based on amount of points
  useEffect(() => {
    switch (true) {
      case points == questionId * 30 * 150:
        message = 'Kingen!'
        break
      case points >= questionId * 15 * 150:
        message = 'Mycket bra!'
        break
      case points <= questionId * 15 * 150 && points > 0:
        message = 'Bra!'
        break
      case points === 0:
        message = 'Oj...'
        break
      default:
        message = 'Laddar resultat'
        break
    }
    return () => console.log('quiz completed')
  }, [quizCompleted])

  // Fetches all questions from database
  useEffect(() => {
    setPoints(0)
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
      isCorrect = undefined
      if (numberOfQuestions >= 0) {
        setQuestionId(questionId + 1)
      }
      if (question != undefined && numberOfQuestions != undefined) {
        let index = Math.floor(Math.random() * numberOfQuestions)
        setQuestionIndex(index)
      }
    }, 500)
    setTimeout(() => {
      if (numberOfQuestions < 0) {
        setQuizCompleted(true)
      }
    }, 400)
  }, [questionAnswered])

  // Checks if answer is correct
  const checkAnswer = (selectedAnswer: string | unknown) => {
    if (selectedAnswer === question[questionIndex].answer) {
      isCorrect = true
      setNumberOfQuestions(numberOfQuestions - 1)
      setTimeout(() => {
        removeQuestion(question, questionIndex)
      }, 500)
    }

    // Checks if answer is incorrect. A vibration should go off
    if (selectedAnswer !== question[questionIndex].answer) {
      isCorrect = false
      Vibration.vibrate()
      setNumberOfQuestions(numberOfQuestions - 1)
      setTimeout(() => {
        removeQuestion(question, questionIndex)
        Vibration.cancel()
      }, 500)
    }
    questionAnswered = !questionAnswered
  }

  // Checks index on the button that is clicked (saved)
  const saveButtonClick = (clickedId: number) => {
    setClickedButton(clickedId)
  }

  // A layout that displays your points
  if (quizCompleted) {
    setTimeout(() => {
      setFinalScore(true)
    }, 500)
    return (
      <Layout>
        {!finalScore ? <MainHeading>Laddar resultat</MainHeading> : <MainHeading>{message}</MainHeading>}
        <Counter numberOfQuestions={questionId} />
        <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
        <Button handleClick={() => shareOnTwitter(points)} text="Dela på twitter" />
      </Layout>
    )
  }

  // Choose the how difficult you want the quiz to be
  if (level == 'Not set') {
    return (
      <Layout>
        <Heading style={{ marginBottom: '20%' }}>Välj svårighetsgrad</Heading>
        <Button text="Normal" handleClick={() => setLevel('Normal')} />
        <Button style={{ marginBottom: '15%' }} text="Hets" handleClick={() => setLevel('Hard')} />
        <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
      </Layout>
    )
  }

  // Choose how many questions you want to answer
  if (numberOfQuestions == 50) {
    return (
      <Layout>
        <Heading style={{ marginBottom: '20%' }}>Välj antal frågor</Heading>
        <Button text="15" handleClick={() => setNumberOfQuestions(14)} />
        <Button text="25" handleClick={() => setNumberOfQuestions(24)} />
        <Button style={{ marginBottom: '15%' }} text="50" handleClick={() => setNumberOfQuestions(49)} />
        <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
      </Layout>
    )
  }

  // A loading screen for when the questions are being printed
  if (question == undefined && quizCompleted == false) {
    return (
      <Layout>
        <Heading>Loading...</Heading>
      </Layout>
    )
  }

  // Quiz view
  return (
    <Layout>
      <Counter level={level} quizCompleted={quizCompleted} isCorrect={isCorrect} />
      {question[questionIndex].question != undefined ? (
        <QuestionContainer questionNumber={`Fråga ${questionId}`} question={question[questionIndex].question} />
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
      <Button style={{ marginTop: '15%' }} handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
    </Layout>
  )
}
