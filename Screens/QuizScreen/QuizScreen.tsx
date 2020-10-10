import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import QuestionContainer from './../../components/QuestionContainer/QuestionContainer'
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'

export default function QuizScreen() {
  const [index, setIndex] = useState<number>(0)

  const [loaded, error] = useFonts({
    Akkurat: require('./../../assets/fonts/Akkurat.ttf'),
  })

  if (!loaded) {
    return null
  }

  const questions = [
    {
      question:
        'Vilken spelare i IFK Göteborg har fått flest gula kort i Allsvenskan genom tiderna?',
      answer: 'Sebastian Eriksson',
      alternatives: {
        one: 'Sebastian Eriksson',
        two: 'Pontus Wernbloom',
        three: 'Håkan Mild',
        four: 'Magnus Erlingmark',
      },
    },
    {
      question: 'Vilket år grundades IFK Göteborg?',
      answer: '1904',
      alternatives: {
        one: '1910',
        two: '1901',
        three: '1904',
        four: '1906',
      },
    },
  ]

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
        questionNumber={`Fråga ${index + 1} av ${questions.length}`}
        question={questions[index].question}
      />
      {Object.entries(questions[index].alternatives).map(([key, value], i) => {
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
      <StatusBar style="auto" />
    </Layout>
  )
}
