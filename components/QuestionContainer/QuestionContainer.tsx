import { StyledText } from './Style'
import React, { Fragment } from 'react'

interface QuestionContainerProps {
  questionNumber?: string
  question: string
}

const QuestionContainer = ({
  questionNumber,
  question,
}: QuestionContainerProps) => {
  return (
    <Fragment>
      <StyledText>{questionNumber}</StyledText>
      <StyledText>{question}</StyledText>
    </Fragment>
  )
}

export default QuestionContainer
