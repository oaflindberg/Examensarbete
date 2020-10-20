// REACT & EXPO
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

// FIREBASE
import firebase from '../../firebase/firebase'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { StyledText } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function ProfileScreen({
  navigation,
}: RouteStackParamList<'Profile'>) {
  const [username, setUsername] = useState<string>('')
  const [confrimation, setConfrimation] = useState<number>(0)

  let user = firebase.auth().currentUser

  const deleteUser = () => {
    if (user !== null) {
      setConfrimation(confrimation + 1)
      if (confrimation == 1) {
        user
          .delete()
          .then(function () {
            setConfrimation(0)
            navigation.navigate('Home')
          })
          .catch(function (error) {})
      }
    }
  }

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        navigation.navigate('Home')
      })
      .catch(function (error) {
        console.log(error.message)
      })
  }

  const updateUsername = () => {
    if (user !== null) {
      user
        .updateProfile({
          displayName: username,
        })
        .then(function () {
          navigation.navigate('Login')
        })
        .catch(function (error) {
          console.log(error.message)
        })
    }
  }

  if (user !== null) {
    if (user.displayName === null) {
      return (
        <Layout>
          <StyledInput
            onChangeText={(text: string) => setUsername(text)}
            autoCapitalize="none"
            placeholder={'Tobias Hysén'}
          ></StyledInput>
          <Button text={'Spara användarnamn'} handleClick={updateUsername} />
        </Layout>
      )
    }
  }

  return (
    <Layout>
      <StyledText>Hej {user?.displayName}!</StyledText>
      <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />
      <Button handleClick={deleteUser} text="Ta bort konto" />
      {confrimation == 1 && <StyledText>Är du säker?</StyledText>}
      <Button handleClick={signOut} text="Logga ut" />
      <StatusBar style="auto" />
    </Layout>
  )
}
