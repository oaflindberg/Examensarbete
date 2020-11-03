import React from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text?: string
  handleClick?: () => void
  isCorrect?: boolean | undefined
  [key: string]: any
}

export default function Button({ text, isCorrect, handleClick, style }: ButtonProps) {
  return (
    <StyledButton onPress={handleClick} isCorrect={isCorrect} style={style}>
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  )
}
