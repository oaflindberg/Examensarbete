import { StatusBar } from 'expo-status-bar'
import React, { Fragment, useState } from 'react'
import { useFonts } from 'expo-font'
import { StyledView, StyledText, Button, ButtonText } from './Styles'

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

  return (
    <StyledView>
      <StyledText>
        Fråga {index + 1} av {questions.length}
      </StyledText>
      <StyledText>{questions[index].question}</StyledText>
      {Object.entries(questions[index].alternatives).map(([key, value], i) => {
        return (
          <Button
            key={i}
            onPress={() => {
              checkAnswer(value, questions[index].answer)
            }}
          >
            <ButtonText>{value}</ButtonText>
          </Button>
        )
      })}
      <StatusBar style="auto" />
    </StyledView>
  )
}
