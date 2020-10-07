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
  font-size: 24px;
  font-family: 'Akkurat';
  width: 80%;
  margin-bottom: 20%;
`

export const Button = styled(TouchableOpacity)`
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
