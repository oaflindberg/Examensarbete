// REACT & EXPO
import React, { useState, useEffect } from 'react'

// FIREBASE & FUNCTIONS
import firebase from '../../firebase/firebase'
// import getHighscores from './../../functions/GetHighscores'
import signOut from './../../functions/SignOut'
import updateUsername from './../../functions/UpdateUsername'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import HighscoreContainer from './../../components/HighscoreContainer/HighscoreContainer'
import { MainHeading, Heading, InfoText, HighscoreInfo } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'
import HighscoreText from './../../components/Highscore/Highscore'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function ProfileScreen({ navigation }: RouteStackParamList<'Profile'>) {
  const [username, setUsername] = useState<string>('')
  const [confirmation, setConfirmation] = useState<number>(0)
  const [highscores, setHighscores] = useState<any>()

  // Fetches highscores for logged in user

  useEffect(() => {
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

  let user = firebase.auth().currentUser

  // Function to delete account

  const deleteUser = () => {
    if (user != null) {
      setConfirmation(confirmation + 1)
      if (confirmation == 1) {
        user
          .delete()
          .then(function () {
            setConfirmation(0)
            navigation.navigate('Home')
          })
          .catch(function (error) {})
      }
    }
  }

  // User needs a username - set one here

  if (user != null) {
    if (user.displayName == null) {
      return (
        <Layout>
          <Heading style={{ marginBottom: '20%' }}>Välj användarnamn</Heading>
          <StyledInput
            onChangeText={(text: string) => setUsername(text)}
            autoCapitalize="none"
            placeholder={'Tobias Hysén'}
            maxLength={8}
          ></StyledInput>
          <InfoText>Användarnamn får max vara 8 tecken långt.</InfoText>
          <Button text={'OK'} handleClick={() => updateUsername(user, username, navigation.navigate('Login'))} />
        </Layout>
      )
    }
  }

  // Profile view

  return (
    <Layout>
      <MainHeading>Hej {user?.displayName}!</MainHeading>
      <HighscoreContainer title="Här är dina 3 bästa resultat" handleClick={() => navigation.navigate('Highscore')}>
        {highscores != undefined ? (
          Object.values(highscores)
            .sort((a: any, b: any) => b.highscore - a.highscore)
            .slice(0, 3)
            .map((value: any, highscoreId: number) => {
              return <HighscoreText key={highscoreId} text={value.highscore} />
            })
        ) : (
          <HighscoreInfo>Det verkar inte finns något här. Testa att spela en gång!</HighscoreInfo>
        )}
      </HighscoreContainer>
      <Button handleClick={() => navigation.navigate('Home')} text="Hem" />
      <Button handleClick={() => signOut(navigation.navigate('Home'))} text="Logga ut" />
      <Button handleClick={deleteUser} text="Ta bort konto" />
      {confirmation == 1 && <InfoText>Klicka igen för att bekräfta</InfoText>}
    </Layout>
  )
}
