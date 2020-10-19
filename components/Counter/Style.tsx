import styled from 'styled-components/native'
import { Text } from 'react-native'

interface Correct {
  correct?: boolean | null
  quizCompleted?: boolean | null
}

export const CounterText = styled(Text)<Correct>`
  font-size: 18px;
  font-family: 'Akkurat';
  margin-bottom: 10px;
  color: #fefefe;
`
