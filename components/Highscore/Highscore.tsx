import React from 'react'
import { HighscoreText } from './Style'

interface HighscoreProps {
  text: number
}

export default function Button({ text }: HighscoreProps) {
  return <HighscoreText>{text}</HighscoreText>
}
