// REACT & EXPO
import React from 'react'
import { StatusBar } from 'expo-status-bar'

// FIREBASE
import firebase from './../../firebase/firebase'

// COMPONENTS & STYLES
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import { StyledText } from './Style'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function HomeScreen({
  navigation,
}: RouteStackParamList<'Home'>) {
  let user = firebase.auth().currentUser

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      })
  }

  return (
    <Layout>
      <StyledText>DET STORA</StyledText>
      <StyledText>BLÅVITA</StyledText>
      <StyledText>QUIZZET!</StyledText>
      <Button handleClick={() => navigation.navigate('Quiz')} text="Starta" />
      {user == null ? (
        <Button
          handleClick={() => navigation.navigate('Login')}
          text="Logga in"
        />
      ) : (
        <Button handleClick={signOut} text="Logga ut" />
      )}
      <StatusBar style="auto" />
    </Layout>
  )
}
