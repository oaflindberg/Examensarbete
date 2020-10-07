import { StackNavigationProp } from '@react-navigation/stack'

export type RouteParamList = {
  Home: undefined
  Quiz: undefined
}

export type RouteStackParamList<T extends keyof RouteParamList> = {
  navigation: StackNavigationProp<RouteParamList, T>
}
