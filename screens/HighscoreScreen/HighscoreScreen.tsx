// REACT & EXPO
import React, { useState, useEffect } from 'react'

// FIREBASE
import firebase from '../../firebase/firebase'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import HighscoreText from './../../components/Highscore/Highscore'
import { HighscoreHeading, HighscoreInfo } from '../../styles/Text'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function HighscoreScreen({ navigation }: RouteStackParamList<'Highscore'>) {
  const [highscores, setHighscores] = useState<any>()

  // Fetches highscores for logged in user

  useEffect(() => {
    let user = firebase.auth().currentUser
    firebase
      .database()
      .ref(`/highscores/${user?.uid}/`)
      .once('value')
      .then((dataSnapshot: firebase.database.DataSnapshot) => {
        if (dataSnapshot != null) {
          setHighscores(dataSnapshot.toJSON())
        }
      })
  }, [])


  // Highscore view

  return (
    <Layout>
      <HighscoreHeading>Här är dina 10 bästa resultat</HighscoreHeading>
      {highscores != undefined ? (
        Object.values(highscores)
          .sort((a: any, b: any) => b.highscore - a.highscore)
          .slice(0, 10)
          .map((value: any, highscoreId: number) => {
            return <HighscoreText key={highscoreId} text={value.highscore} />
          })
      ) : (
        <HighscoreInfo>Det verkar inte finns något här. Testa att spela en gång!</HighscoreInfo>
      )}

      <Button text="Tillbaka" handleClick={() => navigation.navigate('Profile')} />
    </Layout>
  )
}
