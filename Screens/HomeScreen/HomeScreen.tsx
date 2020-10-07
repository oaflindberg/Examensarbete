import { StatusBar } from 'expo-status-bar'
import { StyledView, StyledText, Button, ButtonText } from './Styles'
import React from 'react'
import { useFonts } from 'expo-font'
import { RouteParamList, RouteStackParamList } from 'typings/RouteParams'

export default function HomeScreen({
  navigation,
}: RouteStackParamList<'Home'>) {
  const [loaded, error] = useFonts({
    Akkurat: require('./../../assets/fonts/Akkurat.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <StyledView>
      <StyledText>DET STORA</StyledText>
      <StyledText>BLÅVITT</StyledText>
      <StyledText>QUIZZET!</StyledText>
      <Button onPress={() => navigation.navigate('Quiz')}>
        <ButtonText>Starta</ButtonText>
      </Button>
      <StatusBar style="auto" />
    </StyledView>
  )
}
