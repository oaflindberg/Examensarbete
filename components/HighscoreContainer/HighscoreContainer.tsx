import { StyledText, Highscores, Container, ButtonText } from './Style'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface QuestionContainerProps {
  title: string
  children?: React.ReactNode
  handleClick: () => void
}

const QuestionContainer = ({ title, children, handleClick }: QuestionContainerProps) => {
  return (
    <Container>
      <StyledText>{title}</StyledText>
      {children}
      <TouchableOpacity onPress={handleClick}>
        <ButtonText>Vill du se dina resultat? Klicka här</ButtonText>
      </TouchableOpacity>
    </Container>
  )
}

export default QuestionContainer
