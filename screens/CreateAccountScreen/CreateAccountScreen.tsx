// REACT & EXPO
import React, { useState } from 'react'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { MainHeading, Label } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'
import createAccount from './../../functions/CreateAccout'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function LoginScreen({ navigation }: RouteStackParamList<'Login'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // Navigates to "ProfileScreen" if logged in user

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navigation.navigate('Profile')
    }
  })

  // Register view

  return (
    <Layout>
      <MainHeading>Skapa konto</MainHeading>
      <Label>Email</Label>
      <StyledInput onChangeText={(text) => setEmail(text)} autoCapitalize="none" placeholder={'Example@example.com'} />
      <Label>Lösenord</Label>
      <StyledInput
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        placeholder={'Lösenord'}
      />
      <Button text={'Skapa konto'} handleClick={() => createAccount(firebase, email, password)} />
      <Button handleClick={() => navigation.navigate('Login')} text="Tillbaka" />
    </Layout>
  )
}
