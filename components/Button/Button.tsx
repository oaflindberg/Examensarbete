import React from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text: any
  handleClick?: () => void
  correct?: boolean
  wrong?: boolean
}

export default function Button({
  text,
  correct,
  wrong,
  handleClick,
}: ButtonProps) {
  return (
    <StyledButton onPress={handleClick} correct={correct} wrong={wrong}>
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  )
}
