// Saves highscore in database under /highscores/user.uid/
const saveHighscore = (firebase: any, userId: string, highscore: any, numberOfQuestions: any) => {
  firebase.database().ref(`/highscores/${userId}/${numberOfQuestions}`).push({
    highscore: highscore,
  })
}

export default saveHighscore
