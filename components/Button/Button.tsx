import React, { useState } from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text: string
  handleClick?: () => void
  correct?: boolean
  selectedAnswer?: string
  correctAnswer?: string
}

export default function Button({
  text,
  correct,
  selectedAnswer,
  correctAnswer,
  handleClick,
}: ButtonProps) {
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>()

  const checkAnswer = () => {
    if (selectedAnswer == correctAnswer) {
      setIsCorrect(true)
    } else if (selectedAnswer != correctAnswer) {
      setIsCorrect(false)
    } else {
      setIsCorrect(undefined)
    }
  }

  return (
    <StyledButton
      selectedAnswer={selectedAnswer}
      correctAnswer={correctAnswer}
      onPress={checkAnswer && handleClick}
      correct={isCorrect}
    >
      <ButtonText correct={correct}>{text}</ButtonText>
    </StyledButton>
  )
}
