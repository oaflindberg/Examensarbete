const updateUsername = (user: firebase.User | null, username: string, navigate: void) => {
  if (user != null) {
    user
      .updateProfile({
        displayName: username,
      })
      .then(function () {
        navigate
      })
      .catch(function (error) {
        console.log(error.message)
      })
  }
}

export default updateUsername
