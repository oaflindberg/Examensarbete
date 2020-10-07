import { StatusBar } from 'expo-status-bar'
import { StyledView, StyledText, Button, ButtonText } from './Styles'
import React from 'react'
import { useFonts } from 'expo-font'

export default function HomeScreen() {
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
      <StyledText>QUIZET!</StyledText>
      <Button>
        {/* <ButtonText onPress={() => navigation.navigate('Quiz')}> */}
        <ButtonText>STARTA</ButtonText>
        {/* </ButtonText> */}
      </Button>
      <StatusBar style="auto" />
    </StyledView>
  )
}
