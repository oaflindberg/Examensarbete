import styled from 'styled-components/native'
import { Text } from 'react-native'

interface Correct {
  correct?: boolean | null
  incorrect?: boolean | null
}

export const CounterText = styled(Text)<Correct>`
  font-size: 18px;
  font-family: 'Akkurat';
  margin-bottom: 10px;
  ${({ correct, incorrect }) => {
    switch (true) {
      case correct == true:
        return `color: #fefefe`
      case incorrect == true:
        return `color: #fefefe`
      default: {
        return `color: #fefefe`
      }
    }
  }}
`