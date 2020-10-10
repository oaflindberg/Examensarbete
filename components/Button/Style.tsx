import styled from 'styled-components/native'
import { Text, TouchableOpacity } from 'react-native'

export const StyledButton = styled(TouchableOpacity)`
  width: 50%;
  height: auto;
  padding: 10px 0;
  margin: 10px;
  align-items: center;
  border-radius: 28px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
  background: #fefefe;
`

export const ButtonText = styled(Text)`
  color: #234b9a;
  font-size: 18px;
  font-family: 'Akkurat';
`
