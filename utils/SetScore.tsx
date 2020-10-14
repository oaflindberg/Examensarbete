// TODO: RETURN POINTS NOT WORKING

const calculateScore = (
  question: object | undefined | null,
  correct: boolean | undefined | null,
  incorrect: boolean | undefined | null
): number => {
  let endTime = Math.floor(Date.now() + 22000)
  let points: number = 0
  if (question != undefined) {
    let intervalId = setInterval(() => {
      let startTime = Date.now()
      let timeElapsed = Math.floor((endTime - startTime) / 1000)

      if (correct == true) {
        points += Math.floor(timeElapsed * 125)
        clearInterval(intervalId)
      }

      if (incorrect == true) {
        points = 0
        clearInterval(intervalId)
      }

      if (timeElapsed <= 0 && correct == true) {
        points += 125
        clearInterval(intervalId)
      }

      if (timeElapsed <= 0) {
        clearInterval(intervalId)
      }
    }, 1000)
  }
  return points
}

export default calculateScore
