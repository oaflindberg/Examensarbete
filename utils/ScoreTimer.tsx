// om question inte är undefined, starta nedräkning
// när checkAnswer körs, stoppa timer
// om fel - 0
// om rätt - matematisk uträkning av något slag

const score = (correct: boolean | undefined) => {
  let points
  const start = Date.now()

  const millis = Date.now() - start
  const timeElapsed = Math.floor(millis / 1000)

  if (timeElapsed >= 20) {
    points = 100
  }
  return points
}

export default score
