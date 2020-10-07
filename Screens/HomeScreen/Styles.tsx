import styled from 'styled-components/native'
import { View, Text, TouchableOpacity } from 'react-native'

export const StyledView = styled(View)`
  background: #234b9a;
  color: #fefefe;
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const StyledText = styled(Text)`
  color: #fefefe;
  font-family: 'Akkurat';
  font-size: 50px;
`

export const Button = styled(TouchableOpacity)`
  width: auto;
  height: auto;
  padding: 10px 20px;
  margin-top: 20%;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.2);
  border-radius: 28px;
  background: #fefefe;
`

export const ButtonText = styled(Text)`
  color: #234b9a;
  font-family: 'Akkurat';
  font-size: 18px;
`
