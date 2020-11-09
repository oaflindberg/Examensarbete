import firebase from '../firebase/firebase'

const signOut = (navigate: any) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      navigate
    })
    .catch(function (error: any) {
      console.log(error.message)
    })
}

export default signOut
