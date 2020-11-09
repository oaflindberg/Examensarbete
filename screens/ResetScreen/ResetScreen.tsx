// REACT & EXPO
import React, { useState } from 'react'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { MainHeading, InfoText, ErrorText } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'

// TYPINGS
import { RouteStackParamList } from '../../typings/RouteParams'

export default function LoginScreen({ navigation }: RouteStackParamList<'Reset'>) {
  const [email, setEmail] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const auth = firebase.auth()

  // Function to reset password
  const resetPassword = (email: string) => {
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3500)
      })
      .catch(function (error) {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3500)
      })
  }

  // Reset view
  return (
    <Layout>
      <MainHeading>Återställ lösenord</MainHeading>
      {success && <InfoText>Ett mail har skickats till ditt konto!</InfoText>}
      {error && <ErrorText>Någonting gick fel. Försök igen!</ErrorText>}
      <StyledInput onChangeText={(text) => setEmail(text)} autoCapitalize="none" placeholder={'Example@example.com'} />
      <Button style={{ marginBottom: '15%' }} handleClick={() => resetPassword(email)} text="Återställ lösenord" />
      <Button handleClick={() => navigation.navigate('Login')} text="Tillbaka" />
    </Layout>
  )
}
