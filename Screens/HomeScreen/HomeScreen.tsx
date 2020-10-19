// REACT & EXPO
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { RefreshControl } from 'react-native'

// FIREBASE
import firebase from './../../firebase/firebase'

// COMPONENTS & STYLES
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import { StyledText } from './Style'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

const wait = (timeout: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

export default function HomeScreen({
  navigation,
}: RouteStackParamList<'Home'>) {
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => setRefreshing(false))
  }, [])

  let user = firebase.auth().currentUser

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
        <Button
          handleClick={() => {
            firebase
              .auth()
              .signOut()
              .then(function () {
                // Sign-out successful.
              })
              .catch(function (error) {
                // An error happened.
              })
          }}
          text="Logga ut"
        />
      )}
      <StatusBar style="auto" />
    </Layout>
  )
}
