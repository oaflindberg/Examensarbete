// REACT & EXPO
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

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
  const validate = () => {
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

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail('')
      setPassword('')
      navigation.navigate('Login')
    } else {
    }
  })

  const [loaded, error] = useFonts({
    Akkurat: require('./../../assets/fonts/Akkurat.ttf'),
  })

  if (!loaded) {
    return null
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
      <Button text={'Skapa konto'} handleClick={validate} />
      <StatusBar style="auto" />
    </Layout>
  )
}
