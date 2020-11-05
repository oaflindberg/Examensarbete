// REACT & EXPO
import React, { useState } from 'react'
import { View } from 'react-native'
import CheckBox from 'react-native-check-box'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { MainHeading, Label, InfoText, ErrorText } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function LoginScreen({ navigation }: RouteStackParamList<'Login'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | undefined>()
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false)

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
      .catch(function (err) {
        if (err.message == 'The email address is badly formatted.') {
          setError('Emailadressen är inte en giltig emailadress.')
        } else if (err.message == 'The email address is already in use by another account.') {
          setError('Den här emailadressen är redan registrerad på en användare.')
        } else if (err.message == 'Password should be at least 6 characters') {
          setError('Lösenordet måste vara minst 6 tecken.')
        }
        setTimeout(() => {
          setError(undefined)
        }, 3500)
      })
  }

  if (error != undefined) {
    setTimeout(() => {
      setError(undefined)
    }, 3500)
  }

  // Register view
  return (
    <Layout>
      <MainHeading>Skapa konto</MainHeading>
      <InfoText style={{ marginBottom: '5%' }}>
        Genom att skapa ett konto så kan du se dina tidigare bästa resultat.
      </InfoText>
      {error && <ErrorText>{error}</ErrorText>}
      <Label>Email</Label>
      <StyledInput onChangeText={(text) => setEmail(text)} autoCapitalize="none" placeholder={'Example@example.com'} />
      <Label>Lösenord</Label>
      <StyledInput
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        placeholder={'Lösenord'}
      />
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', padding: '5%' }}>
        <CheckBox
          style={{ marginRight: '2%' }}
          isChecked={acceptTerms}
          onClick={() => setAcceptTerms(!acceptTerms)}
          checkBoxColor="#fefefe"
        />
        <InfoText>Genom att skapa ett konto godkänner du att vi sparar din emailadress.</InfoText>
      </View>
      <Button
        style={{ marginBottom: '15%' }}
        text={'Skapa konto'}
        handleClick={() => (acceptTerms ? createAccount(email, password) : setError('Du måste godkänna villkoren.'))}
      />
      <Button handleClick={() => navigation.navigate('Login')} text="Tillbaka" />
    </Layout>
  )
}
