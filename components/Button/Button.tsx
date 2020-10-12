import React from 'react'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text: any
  handleClick?: () => void
<<<<<<< HEAD
  correct?: boolean
  wrong?: boolean
}

export default function Button({
  text,
  correct,
  wrong,
  handleClick,
}: ButtonProps) {
=======
  wrong?: any
}

export default function Button({ text, handleClick, wrong }: ButtonProps) {
>>>>>>> 9e5dec66864d551cc679b7735f0d838dc0f51507
  return (
    <StyledButton correct={correct} wrong={wrong}>
      <ButtonText onPress={handleClick}>{text}</ButtonText>
    </StyledButton>
  )
}
