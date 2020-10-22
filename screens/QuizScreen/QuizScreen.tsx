//REACT & EXPO
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Vibration } from 'react-native'
import { Audio } from 'expo-av'

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
  const [questionId, setQuestionId] = useState<number>(0)
  const [user, setUser] = useState<object>()
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined)
  const [isIncorrect, setIsIncorrect] = useState<boolean | undefined>(undefined)
  const [clickedButton, setClickedButton] = useState<number | undefined>(undefined)
  const [question, setQuestion] = useState<QuestionProps | any>()
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [level, setLevel] = useState<string | undefined>(undefined)
  const [audio, setAudio] = useState<boolean | null>(null)

  // TODO: IsCorrect/IsIncorrect

  // Fetches user from database

  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user)
    }
  })
  }, [user, setUser])

  // Looping audio for hardmode (Not working as it should, check looping(Might be rendering-bugg))

  const loopingAudio = async () => {
    const soundObject = new Audio.Sound();
     try {
     await soundObject.loadAsync(require('../../assets/BLAVITT.mp3'))
     if (audio == true) {
       await soundObject.playAsync()
       await soundObject.setIsLoopingAsync(true)
      } else {
        await soundObject.unloadAsync();
      }
   } catch (error) {
     // An error occurred
   }
  }

  // Fetches questions from database
  
  useEffect(() => {
    setIsCorrect(false)
    setIsIncorrect(false)
    const database = firebase.database()
    database
      .ref(`/questions/${questionId}`)
      .once('value')
      .then((dataSnapshot) => {
        let questions = dataSnapshot.toJSON()
        setQuestion(questions)
        setAudio(true)

        if (questions == null) {
          setQuizCompleted(true)
        }
      })
  }, [questionId,
      setQuestion,
      setAudio,
      setIsCorrect,
      setIsIncorrect,
      setQuizCompleted])

  // Checks if answer is correct 

  const checkAnswer = (selectedAnswer: string) => {
    if (selectedAnswer == question.answer) {
      setIsCorrect(true)
      setTimeout(() => {
        setQuestionId(questionId + 1)
      }, 750)
    }

    // Checks if answer is incorrect, a vibration should go off

    if (selectedAnswer != question.answer) {
      setIsIncorrect(true)
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
    //
    // THIS WILL BE HIGHSCORE IN THE FUTURE
    // Hur hämtar vi poängen hit?

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

  // Annan sortering
  
  // An array filled with the questions (And then we use a sort-effect to randomize them)

  const questionsArray = Object.entries(question.alternatives).sort(
    () => Math.random() - 0.5
  )

  // Here you can choose the how difficult you want the quiz to be

  if (level == undefined) {
    return (
      <Layout>
        <Heading style={{ marginBottom: '20%' }}>Välj svårighetsgrad</Heading>
        <Button text="Normal" handleClick={() => setLevel("Normal")} />
        <Button text="Hets" handleClick={() => setLevel("Hard")} />
      </Layout>
    )
  }

  // If you choose the level "Hard", an audio file will begin playing
 if (level == "Hard") {
    loopingAudio()
  }

  // This is the <Layout> you get when playing the quiz

  return (
    <Layout>
      <Counter
        level={level}
        quizCompleted={quizCompleted}
        correct={isCorrect}
      />
      <QuestionContainer
        questionNumber={`Fråga ${questionId + 1}`}
        question={question.question}
      />
       {questionsArray.map(([key, value]: [string, any], buttonId: number) => {
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
