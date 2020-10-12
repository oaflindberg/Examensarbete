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
    <StyledButton correct={correct} wrong={wrong}>
      <ButtonText onPress={handleClick}>{text}</ButtonText>
    </StyledButton>
  )
}
