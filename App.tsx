import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import QuizScreen from './Screens/QuizScreen/QuizScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen'
import CreateAccoutScreen from './Screens/CreateAccountScreen/CreateAccountScreen'
import React from 'react'

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
