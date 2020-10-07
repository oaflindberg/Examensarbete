import { StatusBar } from 'expo-status-bar'
import React, { Fragment } from 'react'
import { useFonts } from 'expo-font'
import { StyledView, StyledText, Button, ButtonText } from './Styles'

export default function QuizScreen() {
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
  ]

  const checkAnswer = (pressed: any, answer: any) => {
    if (pressed == answer) {
      console.log('correct')
    } else {
      console.log('wrong')
    }
  }

  return (
    <StyledView>
      {questions.map((question, i) => {
        return (
          <Fragment key={i}>
            <StyledText>{question.question}</StyledText>
            {Object.entries(question.alternatives).map(([key, value], i) => {
              return (
                <Button
                  key={i}
                  onPress={() => {
                    checkAnswer(value, question.answer)
                  }}
                >
                  <ButtonText>{value}</ButtonText>
                </Button>
              )
            })}
          </Fragment>
        )
      })}
      <StatusBar style="auto" />
    </StyledView>
  )
}
