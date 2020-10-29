import firebase from './../firebase/firebase'

const createAccount = (email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error: any) {
      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message
      console.log(errorMessage)
    })
}

export default createAccount
