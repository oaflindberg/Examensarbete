import React from 'react'
import { useFonts } from 'expo-font'
import { StyledView } from './Style'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [loaded, error] = useFonts({
    Dosis: require('./../../assets/fonts/Dosis.ttf'),
  })

  if (!loaded) {
    return null
  }

  return <StyledView>{children}</StyledView>
}
