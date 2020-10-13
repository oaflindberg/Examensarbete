import React from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text: string
  handleClick?: () => void
  correct?: boolean | undefined | null
  incorrect?: boolean | undefined | null
}

export default function Button({
  text,
  correct,
  incorrect,
  handleClick,
}: ButtonProps) {
  return (
    <StyledButton onPress={handleClick} correct={correct} incorrect={incorrect}>
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  )
}
