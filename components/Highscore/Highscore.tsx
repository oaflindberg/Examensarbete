import React from 'react'
import { HighscoreText } from './Style'

interface HighscoreProps {
  text: string
}

export default function Button({ text }: HighscoreProps) {
  return <HighscoreText>{text}</HighscoreText>
}
