import styled from 'styled-components/native'
import { Text, TouchableOpacity } from 'react-native'

interface Correct {
  isCorrect?: boolean | null
  isIncorrect?: boolean | null
}

// State = Status(State) Correct, Incorrect, Default (IsCorrect == Null)

export const StyledButton = styled(TouchableOpacity)<Correct>`
  width: 50%;
  height: auto;
  padding: 10px 0;
  margin: 10px;
  align-items: center;
  border-radius: 28px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
  ${({ isCorrect, isIncorrect }) => {
    switch (true) {
      case isCorrect:
        return `background: #c2fc0a`
      case isIncorrect:
        return `background: #fc0a49`
      default: {
        return `background: #fefefe`
      }
    }
  }}
`

export const ButtonText = styled(Text)<Correct>`
  color: #303030;
  font-size: 18px;
  font-family: 'Akkurat';
`
