import styled from 'styled-components/native'
import { Text, TouchableOpacity } from 'react-native'

interface Correct {
  isCorrect?: boolean | undefined
}

export const StyledButton = styled(TouchableOpacity)<Correct>`
  width: 50%;
  height: auto;
  padding: 10px 0;
  margin: 10px;
  align-items: center;
  border-radius: 28px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
  ${({ isCorrect }) => {
    switch (isCorrect) {
      case true:
        return `background: #c2fc0a`
      case false:
        return `background: #fc0a49`
      case undefined:
        return `background: #fefefe`
      default: {
        return `background: #fefefe`
      }
    }
  }}
`

export const ButtonText = styled(Text)<Correct>`
  color: #303030;
  font-size: 18px;
  font-family: 'Dosis';
`
