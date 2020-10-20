import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import { StyledView } from './Style'
import { PointsProvider } from './../../context/PointsContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [points, setPoints] = useState<number>(0)
  // const [loaded, error] = useFonts({
  //   Akkurat: require('./../../assets/fonts/Akkurat.ttf'),
  // })

  // if (!loaded) {
  //   return null
  // }

  return (
    <PointsProvider value={[points, setPoints]}>
      <StyledView>{children}</StyledView>
    </PointsProvider>
  )
}
