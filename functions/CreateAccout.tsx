const createAccount = (firebase: any, email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error: any) {
      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message
      // ...
    })
}

export default createAccount
