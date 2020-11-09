import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { StyledButton, ButtonText } from './Style'

interface ButtonProps {
  text?: string
  handleClick?: () => void
  isCorrect?: boolean | undefined
  style?: StyleProp<ViewStyle>
}

export default function Button({ text, isCorrect, handleClick, style }: ButtonProps) {
  return (
    <StyledButton onPress={handleClick} isCorrect={isCorrect} style={style}>
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  )
}
