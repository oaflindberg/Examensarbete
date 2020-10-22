import React from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text: string
  handleClick?: () => void
  isCorrect?: boolean | null
  isIncorrect?: boolean | null
}

export default function Button({
  text,
  isCorrect,
  isIncorrect,
  handleClick,
}: ButtonProps) {
  return (
    <StyledButton onPress={handleClick} isCorrect={isCorrect} isIncorrect={isIncorrect}>
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  )
}
