// REACT & EXPO
import React, { useState, useContext } from 'react'
import { TouchableOpacity } from 'react-native'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { MainHeading, InfoText, Label } from '../../styles/Text'
import { StyledInput } from '../../styles/Input'

// FUNCTIONS & FIREBASE
import firebase from '../../firebase/firebase'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function LoginScreen({ navigation }: RouteStackParamList<'Login'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  // Function to sign in user
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
        }, 3500)
      })
  }

  // Navigates to "HomeScreen"
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navigation.navigate('Home')
    } else {
    }
  })

  // Login view
  return (
    <Layout>
      <MainHeading>Välkommen!</MainHeading>
      {error && <InfoText>Någonting gick fel. Försök igen!</InfoText>}
      <Label>Email</Label>
      <StyledInput onChangeText={(text) => setEmail(text)} autoCapitalize="none" placeholder={'Example@example.com'} />
      <Label>Lösenord</Label>
      <StyledInput
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        placeholder={'Lösenord'}
      />
      <Button text={'Logga in'} handleClick={signIn} />
      <TouchableOpacity style={{ marginBottom: "15%" }} onPress={() => navigation.navigate('CreateAccount')}>
        <InfoText>Har du inget konto? Klicka här för att skapa ett</InfoText>
      </TouchableOpacity>
      <Button handleClick={() => navigation.navigate('Reset')} text="Glömt lösenord?" />
      <Button handleClick={() => navigation.navigate('Home')} text="Tillbaka" />

    </Layout>
  )
}
