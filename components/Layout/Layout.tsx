import React, { useState } from 'react'
import { StyledView } from './Style'
import { PointsProvider } from './../../context/PointsContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [points, setPoints] = useState<number>(0)
  return (
    <PointsProvider value={[points, setPoints]}>
      <StyledView>{children}</StyledView>
    </PointsProvider>
  )
}
