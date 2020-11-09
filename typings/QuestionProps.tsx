export default interface QuestionProps {
  alternatives:
    | string[]
    | {
        one: string
        two: string
        three: string
        four: string
      }
  answer: string
  question: string
  questionId: number
}
