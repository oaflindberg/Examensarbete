// REACT & EXPO
import React, { useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, TouchableOpacity } from 'react-native'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { StyledText, CreateAccount } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function LoginScreen({
  navigation,
}: RouteStackParamList<'Login'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2000)
      })
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navigation.navigate('Home')
    } else {
    }
  })

  return (
    <Layout>
      <StyledText>Välkommen!</StyledText>
      {error && <StyledText>Någonting gick fel. Testa igen!</StyledText>}
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
      <Button text={'Logga in'} handleClick={signIn} />
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <CreateAccount>
          Har du inget konto? Klicka här för att skapa ett
        </CreateAccount>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </Layout>
  )
}
