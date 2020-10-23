// TODO: See if we can solve this instead of having to write the functions inside ProfileScreen.tsx

// const getHighscores = (firebase: any, userId: string | undefined): any => {
//   let highscores: firebase.database.DataSnapshot | any
//   firebase
//     .database()
//     .ref(`/highscores/${userId}/`)
//     .once('value')
//     .then((dataSnapshot: firebase.database.DataSnapshot) => {
//       // console.log('datasnapshot', dataSnapshot)
//       if (dataSnapshot !== null) {
//         // console.log('datasnapshot toJSON', dataSnapshot.toJSON())
//         highscores = dataSnapshot.toJSON()
//       }
//     })
//   setTimeout(() => {
//     // console.log('highscores', highscores)
//     return highscores
//   }, 5000)
// }

// export default getHighscores
