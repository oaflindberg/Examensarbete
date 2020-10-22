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

const test = async () => {
  const soundObject = new Audio.Sound();
   try {
   await soundObject.loadAsync(require('../../assets/BLAVITT.mp3'))
   await soundObject.playAsync()
   await soundObject.setIsLoopingAsync(true)
   // Your sound is playing!

   // Don't forget to unload the sound from memory
   // when you are done using the Sound object
  //  await soundObject.unloadAsync();
 } catch (error) {
   // An error occurred
 }
}

 

export default function QuizScreen({
  navigation,
}: RouteStackParamList<'Quiz'>) {
  const [questionId, setQuestionId] = useState<number>(0)
  const [user, setUser] = useState<object>()
  const [isCorrect, setIsCorrect] = useState<boolean | null>()
  const [isIncorrect, setIsIncorrect] = useState<boolean | null>()
  const [clickedButton, setClickedButton] = useState<number | undefined>()
  const [question, setQuestion] = useState<QuestionProps | any>()
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [level, setLevel] = useState<string | undefined>()

  // TODO: IsCorrect/IsIncorrect

  // Fetches user from database

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user)
    }
  })
  })
  
  // Fetches questions from database

  
  useEffect(() => {
    setIsCorrect(undefined)
    const database = firebase.database()
    database
      .ref(`/questions/${questionId}`)
      .once('value')
      .then((dataSnapshot) => {
        let questions = dataSnapshot.toJSON()
        console.log(isCorrect)
        setQuestion(questions)
        setClickedButton(undefined)

        if (questions == null) {
          setQuizCompleted(true)
        }
      })
  }, [questionId])

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

  // Kolla detta

  const saveButtonClick = (buttonValue: string, index: number) => {
    if (buttonValue == question.answer) {
      setClickedButton(index)
    } else {
      setClickedButton(index)
    }
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
    // THIS WILL BE HIGHSCORE IN THE FUTURE
    // 

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

  if (level == "Hard") {
    test()
  }

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

  // This is the <Layout> you get when playing the quiz
console.log("Hej")
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
            correct={clickedButton === buttonId && isCorrect}
            incorrect={clickedButton === buttonId && isIncorrect}
            key={buttonId}
            handleClick={() => {
              checkAnswer(value)
              saveButtonClick(value, buttonId)
            }}
            text={value}
          />
        )
      })} 
      <StatusBar style="auto" />
    </Layout>
  )
}
