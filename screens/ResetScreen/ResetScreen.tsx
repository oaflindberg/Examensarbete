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
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_CONSTANT } from 'expo-av/build/Audio'

export default function LoginScreen({ navigation }: RouteStackParamList<'Reset'>) {
    const [email, setEmail] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const auth = firebase.auth();

    // Function to reset password
    
    const resetPassword = (email: string) => {
        auth.sendPasswordResetEmail(email).then(function() {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
          }, 3500)
        }).catch(function(error) {
            setError(true)
            setTimeout(() => {
                setError(false)
              }, 3500)
        });
    }

    // Reset view

  return (
    <Layout>
        {success && (
            <InfoText>Ett mail har skickats till ditt konto!</InfoText>
        )}
        {error && (
            <InfoText>Någonting gick fel. Försök igen!</InfoText>
        )}
        <StyledInput onChangeText={(text) => setEmail(text)} autoCapitalize="none" placeholder={'Example@example.com'} />
        <Button handleClick={() => resetPassword(email) } text="Återställ lösenord" />
        <Button handleClick={() => navigation.navigate('Login')} text="Tillbaka" />
    </Layout>
  )
}