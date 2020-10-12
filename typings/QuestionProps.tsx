export default interface QuestionProps {
  alternatives: {
    one: string
    two: string
    three: string
    four: string
  }
  answer: string
  question: string
  questionId: number
}
