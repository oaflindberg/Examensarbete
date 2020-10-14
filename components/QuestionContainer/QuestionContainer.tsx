import { StyledText } from './Style'
import React, { Fragment } from 'react'

interface QuestionContainerProps {
  questionNumber?: string
  question: string
  score: number
}

const QuestionContainer = ({
  questionNumber,
  question,
  score,
}: QuestionContainerProps) => {
  return (
    <Fragment>
      <StyledText>Poäng: {score}</StyledText>
      <StyledText>{questionNumber}</StyledText>
      <StyledText>{question}</StyledText>
    </Fragment>
  )
}

export default QuestionContainer
