const signOut = (firebase: any, navigate: any) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // navigation.navigate('Home')
      navigate
    })
    .catch(function (error: any) {
      console.log(error.message)
    })
}

export default signOut
