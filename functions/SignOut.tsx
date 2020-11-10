import firebase from '../firebase/firebase'

const signOut = (navigate: void) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      navigate
    })
    .catch(function (error) {
      console.log(error.message)
    })
}

export default signOut
