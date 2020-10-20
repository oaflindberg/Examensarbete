// REACT & EXPO
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

// FIREBASE
import firebase from './../../firebase/firebase'

// COMPONENTS & STYLES
import Button from './../../components/Button/Button'
import Layout from './../../components/Layout/Layout'
import { StyledText } from './Style'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'


export default function ProfileScreen({
    navigation,
}: RouteStackParamList<'Profile'>) {
    

    let user = firebase.auth().currentUser

const deleteUser = () => {
    if (user !== null) {
        user.delete().then(function() {
            navigation.navigate('Home')
        }).catch(function(error) {
            
        });
    }
}


  return (
    <Layout>
      <StyledText>Hej {user?.displayName}!</StyledText>
      <Button
        handleClick={() => navigation.navigate('Home')}
        text="Tillbaka"
        />
    <Button
        handleClick={deleteUser}
        text="Ta bort konto"
        />
      <StatusBar style="auto" />
    </Layout>
  )
}
