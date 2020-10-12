import React from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text: any
  handleClick?: () => void
  wrong?: any
}

export default function Button({ text, handleClick, wrong }: ButtonProps) {
  return (
    <StyledButton>
      <ButtonText onPress={handleClick}>{text}</ButtonText>
    </StyledButton>
  )
}
