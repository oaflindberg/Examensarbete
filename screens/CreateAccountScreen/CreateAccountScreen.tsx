// REACT & EXPO
import React, { useState } from 'react'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { MainHeading, Label, InfoText } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'
import createAccount from '../../functions/CreateAccount'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function LoginScreen({ navigation }: RouteStackParamList<'Login'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | undefined>()

  // Navigates to "ProfileScreen" if logged in user

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navigation.navigate('Profile')
    }
  })

  // Function to create account

  const createAccount = (email: string, password: string) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (err: any) {
        if (err.message == "The email address is badly formatted." ) {
          setError("Emailadressen är inte en giltig emailadress.")
        } else if (err.message == "The email address is already in use by another account.") {
          setError("Den här emailadressen är redan registrerad på en användare.")
        } else if (err.message == "Password should be at least 6 characters") {
          setError("Lösenordet måste vara minst 6 tecken.")
        }
        setTimeout(() => {
          setError(undefined)
        }, 3500)
      console.log(err.message)
      })
  }

  // Register view

  return (
    <Layout>
      <MainHeading>Skapa konto</MainHeading>
      <InfoText>Genom att skapa ett konto så kan du se dina tidigare bästa resultat.</InfoText>
      {error && (
        <InfoText>{error}</InfoText>
      )}
      <Label>Email</Label>
      <StyledInput onChangeText={(text) => setEmail(text)} autoCapitalize="none" placeholder={'Example@example.com'} />
      <Label>Lösenord</Label>
      <StyledInput
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        placeholder={'Lösenord'}
      />
      <Button text={'Skapa konto'} handleClick={() => createAccount(email, password)} />
      <Button handleClick={() => navigation.navigate('Login')} text="Tillbaka" />
    </Layout>
  )
}
