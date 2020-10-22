import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import QuizScreen from './screens/QuizScreen/QuizScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import CreateAccoutScreen from './screens/CreateAccountScreen/CreateAccountScreen'
import HighscoreScreen from './screens/HighscoreScreen/HighscoreScreen'

export default function App() {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccoutScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Highscore" component={HighscoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
