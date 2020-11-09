import firebase from '../firebase/firebase'

// Saves highscore in database under /highscores/user.uid/
const saveHighscore = (userId: string, points: number, numberOfQuestions: number) => {
  firebase.database().ref(`/highscores/${userId}/${numberOfQuestions}`).push({
    highscore: points,
  })
}

export default saveHighscore
