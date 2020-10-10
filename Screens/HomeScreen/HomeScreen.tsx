import React from 'react'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { StyledText } from './Style'
import { RouteStackParamList } from 'typings/RouteParams'
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'

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
      <StyledText>BLÅVITT</StyledText>
      <StyledText>QUIZZET!</StyledText>
      <Button handleClick={() => navigation.navigate('Quiz')} text="Starta" />
      <StatusBar style="auto" />
    </Layout>
  )
}
