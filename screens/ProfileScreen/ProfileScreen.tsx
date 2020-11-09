// REACT & EXPO
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

// FIREBASE & FUNCTIONS
import firebase from '../../firebase/firebase'
import signOut from './../../functions/SignOut'
import updateUsername from './../../functions/UpdateUsername'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { MainHeading, Heading, InfoText, HighscoreInfo, ErrorText } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function ProfileScreen({ navigation }: RouteStackParamList<'Profile'>) {
  const [username, setUsername] = useState<string>('')
  const [confirmation, setConfirmation] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)

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
          .catch(function (error) {
            setError(true)
          })
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
      <TouchableOpacity onPress={() => navigation.navigate('Highscore')}>
        <HighscoreInfo>Vill du se dina resultat? Klicka här</HighscoreInfo>
      </TouchableOpacity>
      <Button style={{ marginBottom: '15%' }} handleClick={() => navigation.navigate('Home')} text="Hem" />
      <Button handleClick={() => signOut(navigation.navigate('Home'))} text="Logga ut" />
      <Button handleClick={deleteUser} text="Ta bort konto" />
      {error && <ErrorText>Logga ut och in igen för att bekräfta att det är ditt konto du försöker ta bort</ErrorText>}
      {confirmation == 1 && <InfoText>Klicka igen för att bekräfta</InfoText>}
    </Layout>
  )
}
