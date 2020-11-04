import styled from 'styled-components/native'
import { Text } from 'react-native'

export const StyledText = styled(Text)`
  color: #fefefe;
  font-family: 'Dosis';
`

export const MainHeading = styled(StyledText)`
  font-size: 50px;
  margin-bottom: 20%;
  text-align: center;
  width: 80%;
`

export const Heading = styled(StyledText)`
  font-size: 40px;
`

export const Label = styled(StyledText)`
  font-size: 14px;
  margin-top: 10px;
`

export const InfoText = styled(StyledText)`
  text-align: center;
  font-size: 16px;
`

export const ErrorText = styled(StyledText)`
  text-align: center;
  font-size: 16px;
  color: #fc0a49;
`

export const HighscoreHeading = styled(StyledText)`
  font-size: 24px;
  text-align: center;
  margin-bottom: 10%;
`

export const HighscoreInfo = styled(StyledText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10%;
`
