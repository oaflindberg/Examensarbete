// REACT & EXPO
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'

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
  const [numberOfQuestions, setNumberOfQuestions] = useState<any>()

  // Fetches highscores for logged in user
  useEffect(() => {
    let user = firebase.auth().currentUser
    firebase
      .database()
      .ref(`/highscores/${user?.uid}/${numberOfQuestions}`)
      .once('value')
      .then((dataSnapshot: firebase.database.DataSnapshot) => {
        if (dataSnapshot != null) {
          setHighscores(dataSnapshot.toJSON())
        }
      })
  }, [numberOfQuestions])

  // Highscore view
  return (
    <Layout>
      <HighscoreHeading style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        Välj vilken quizlängd du vill se resultat för:
      </HighscoreHeading>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          marginBottom: '10%',
        }}
      >
        <TouchableOpacity onPress={() => setNumberOfQuestions(14)}>
          <HighscoreHeading>15</HighscoreHeading>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNumberOfQuestions(24)}>
          <HighscoreHeading>25</HighscoreHeading>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNumberOfQuestions(49)}>
          <HighscoreHeading>50</HighscoreHeading>
        </TouchableOpacity>
      </View>
      {numberOfQuestions != undefined ? (
        <HighscoreInfo style={{ paddingLeft: '5%', paddingRight: '5%' }}>
          Här är dina tio bästa resultat med {numberOfQuestions + 1} frågor:{' '}
        </HighscoreInfo>
      ) : (
        <></>
      )}
      {highscores != undefined ? (
        Object.values(highscores)
          .sort((a: any, b: any) => b.highscore - a.highscore)
          .slice(0, 10)
          .map((value: any, highscoreId: number) => {
            return <HighscoreText key={highscoreId} text={`${highscoreId + 1}. ${value.highscore}`} />
          })
      ) : (
        <HighscoreInfo style={{ marginBottom: '15%', paddingLeft: '5%', paddingRight: '5%' }}>
          Det verkar inte finns något här. Testa att spela en gång!
        </HighscoreInfo>
      )}

      <Button text="Tillbaka" handleClick={() => navigation.navigate('Profile')} />
    </Layout>
  )
}
