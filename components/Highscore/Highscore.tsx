import React from 'react'
import { HighscoreText } from './Style'

interface HighscoreProps {
  text: string | number
}

export default function HighScoreText({ text }: HighscoreProps) {
  return <HighscoreText>{text}</HighscoreText>
}
