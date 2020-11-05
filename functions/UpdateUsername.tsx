const updateUsername = (user: any, username: string, navigate: any) => {
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
