// Saves highscore in database under /highscores/user.uid/
const saveHighscore = (firebase: any, userId: string, highscore: any) => {
  firebase.database().ref(`/highscores/${userId}`).push({
    highscore: highscore,
  })
}

export default saveHighscore
