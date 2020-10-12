import styled from 'styled-components/native'
import { Text, TouchableOpacity } from 'react-native'

interface Correct {
  correct?: boolean
  background: string
  wrong?: boolean
}

export const StyledButton = styled(TouchableOpacity)<Correct>`
  width: 50%;
  height: auto;
  padding: 10px 0;
  margin: 10px;
  align-items: center;
  border-radius: 28px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
  ${({ correct, wrong }) => {
    switch (true) {
      case correct:
        return `background: #abc354`
      case wrong:
        return `background: #d40514`
      default: {
        return `background: #fefefe`
      }
    }
  }}
`

export const ButtonText = styled(Text)`
  color: #234b9a;
  font-size: 18px;
  font-family: 'Akkurat';
`
