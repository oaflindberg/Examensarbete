// REACT & EXPO
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

// COMPONENTS & STYLES
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import { StyledText } from './Style'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

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
    <Layout>
      <StyledText>DET STORA</StyledText>
      <StyledText>BLÅVITA</StyledText>
      <StyledText>QUIZZET!</StyledText>
      <Button handleClick={() => navigation.navigate('Quiz')} text="Starta" />
      <StatusBar style="auto" />
    </Layout>
  )
}
