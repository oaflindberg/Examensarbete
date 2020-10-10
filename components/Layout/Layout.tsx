import React from 'react'
import { StyledView } from './Style'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <StyledView>{children}</StyledView>
}
