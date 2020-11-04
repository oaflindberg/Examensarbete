import styled from 'styled-components/native'
import { Text } from 'react-native'

interface Correct {
  isCorrect?: boolean | null
  quizCompleted?: boolean | null
  level?: string | undefined
}

export const CounterText = styled(Text)<Correct>`
  font-size: 18px;
  font-family: 'Dosis';
  margin-bottom: 10px;
  color: #fefefe;
`
