import styled from 'styled-components/native'
import { Text, TouchableOpacity } from 'react-native'

interface Correct {
  correct?: boolean | null
  incorrect?: boolean | null
}

export const StyledButton = styled(TouchableOpacity)<Correct>`
  width: 50%;
  height: auto;
  padding: 10px 0;
  margin: 10px;
  align-items: center;
  border-radius: 28px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
  ${({ correct, incorrect }) => {
    switch (true) {
      case correct == true:
        return `background: #c2fc0a`
      case incorrect == true:
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
