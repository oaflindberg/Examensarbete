// REACT & EXPO
import React, { useEffect, useState, useContext } from 'react'

// FIREBASE
import firebase from '../../firebase/firebase'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { MainHeading } from '../../styles/Text'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function HomeScreen({ navigation }: RouteStackParamList<'Home'>) {
  const [loggedIn, setLoggedIn] = useState(false)

  // Checks if user is logged in
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
  }, [loggedIn, setLoggedIn])

  // Home view
  return (
    <Layout>
      <MainHeading>DET STORA BLÅVITA QUIZZET</MainHeading>
      <Button handleClick={() => navigation.navigate('Quiz')} text="Starta" />
      {!loggedIn ? (
        <Button handleClick={() => navigation.navigate('Login')} text="Logga in" />
      ) : (
        <Button handleClick={() => navigation.navigate('Profile')} text="Profilsida" />
      )}
    </Layout>
  )
}
