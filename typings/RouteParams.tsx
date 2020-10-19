import { StackNavigationProp } from '@react-navigation/stack'

type RouteParamList = {
  Home: undefined
  Quiz: undefined
  Login: undefined
  CreateAccount: undefined
}

export type RouteStackParamList<T extends keyof RouteParamList> = {
  navigation: StackNavigationProp<RouteParamList, T>
}
