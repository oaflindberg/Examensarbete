import { StyledText, Highscores, Container, ButtonText } from './Style'
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface QuestionContainerProps {
  title: string
  score1: string
  score2: string
  score3: string
  handleClick: () => void
}

const QuestionContainer = ({
  title,
  score1,
  score2,
  score3,
  handleClick,
}: QuestionContainerProps) => {
  return (
    <Container>
      <StyledText>{title}</StyledText>
      <Highscores>1: {score1}</Highscores>
      <Highscores>2: {score2}</Highscores>
      <Highscores>3: {score3}</Highscores>
      <TouchableOpacity onPress={handleClick}>
        <ButtonText>Vill du se fler resultat? Klicka här</ButtonText>
      </TouchableOpacity>
    </Container>
  )
}

export default QuestionContainer
