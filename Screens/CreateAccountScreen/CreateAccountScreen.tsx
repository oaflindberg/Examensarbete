// REACT & EXPO
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

// COMPONENTS & STYLES
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import { StyledText, StyledInput } from './Style'

// FUNCTIONS & FIREBASE
import firebase from './../../firebase/firebase'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function LoginScreen({
  navigation,
}: RouteStackParamList<'Login'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [userExists, setUserExists] = useState(false)
  const createAccount = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // ...
      })
  }

  let user = firebase.auth().currentUser

  const updateUsername = () => {
    if (user != undefined) {
      user
        .updateProfile({
          displayName: username,
        })
        .then(function () {
          navigation.navigate('Login')
        })
        .catch(function (error) {
          // An error happened.
        })
    }
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // navigation.navigate('Login')
      setUserExists(true)
    } else {
    }
  })

  if (userExists == true) {
    return (
      <Layout>
        <StyledText>Välj användarnamn</StyledText>
        <StyledInput
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          placeholder={'hej'}
        />
        <Button text={'OK'} handleClick={updateUsername} />
        <StatusBar style="auto" />
      </Layout>
    )
  }

  return (
    <Layout>
      <StyledText>Skapa konto!</StyledText>
      <StyledInput
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        placeholder={'Example@example.com'}
      />
      <StyledInput
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        placeholder={'Lösenord'}
      />
      <Button text={'Skapa konto'} handleClick={createAccount} />
      <StatusBar style="auto" />
    </Layout>
  )
}
