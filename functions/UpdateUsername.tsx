const updateUsername = (user: any, username: any, navigate: any) => {
  if (user !== null) {
    user
      .updateProfile({
        displayName: username,
      })
      .then(function () {
        navigate
      })
      .catch(function (error: any) {
        console.log(error.message)
      })
  }
}

export default updateUsername
