// REACT & EXPO
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

// FIREBASE
import firebase from '../../firebase/firebase'

// COMPONENTS & STYLES
import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/Layout'
import { MainHeading } from '../../styles/Text'

// TYPINGS
import { RouteStackParamList } from 'typings/RouteParams'

export default function HighscoreScreen({
  navigation,
}: RouteStackParamList<'Highscore'>) {
                        console.log('Hej hej')

  return (
    <Layout>
      <Button
        text="Tillbaks"
        handleClick={() => navigation.navigate('Profile')}
      />
      <StatusBar style="auto" />
    </Layout>
  )
}
