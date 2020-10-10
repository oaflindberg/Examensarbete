import React from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text: string
  handleClick?: () => void
}

export default function Button({ text, handleClick }: ButtonProps) {
  return (
    <StyledButton>
      <ButtonText onPress={handleClick}>{text}</ButtonText>
    </StyledButton>
  )
}
