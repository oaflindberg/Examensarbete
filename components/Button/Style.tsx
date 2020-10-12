import styled from 'styled-components/native'
import { Text, TouchableOpacity } from 'react-native'

<<<<<<< HEAD
interface Correct {
  correct?: boolean
  background: string
  wrong?: boolean
}

export const StyledButton = styled(TouchableOpacity)<Correct>`
=======
interface wrongAnswer 
{wrong?:boolean
}

export const StyledButton = styled(TouchableOpacity)<wrongAnswer>`
>>>>>>> 9e5dec66864d551cc679b7735f0d838dc0f51507
  width: 50%;
  height: auto;
  padding: 10px 0;
  margin: 10px;
  align-items: center;
  border-radius: 28px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
<<<<<<< HEAD
  ${({ correct, wrong }) => {
    switch (true) {
      case correct:
        return `background : #abc354`
      case wrong:
        return `background : #d40514`
      default: {
        return `background: #fefefe`
      }
    }
  }}
`
=======
  background: ${props => props.wrong ? "#dd2429" : "#fefefe"};
  `
>>>>>>> 9e5dec66864d551cc679b7735f0d838dc0f51507

export const ButtonText = styled(Text)`
  color: #234b9a;
  font-size: 18px;
  font-family: 'Akkurat';
`