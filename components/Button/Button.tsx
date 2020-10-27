import React from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text: string | unknown
  handleClick?: () => void
  isCorrect?: boolean | undefined
}

export default function Button({ text, isCorrect, handleClick }: ButtonProps) {
  return (
    <StyledButton onPress={handleClick} isCorrect={isCorrect}>
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  )
}
