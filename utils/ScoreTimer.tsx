// om question inte är undefined, starta nedräkning
// när checkAnswer körs, stoppa timer
// om fel - 0
// om rätt - matematisk uträkning av något slag

const score = (
  correct: boolean | undefined | null,
  incorrect: boolean | undefined | null
) => {
  let endTime = Math.floor(Date.now() + 21000)
  let x = setInterval(() => {
    let points: number
    let startTime = Date.now()

    let timeElapsed = Math.floor((endTime - startTime) / 1000)

    if (correct == true) {
      return (points = 5000 / timeElapsed)
    }

    if (incorrect == true) {
      return (points = 0)
    }

    if (timeElapsed >= 20) {
      return (points = 250)
    }

    if (timeElapsed <= 0) {
      clearInterval(x)
    }
  }, 1000)
}

export default score
