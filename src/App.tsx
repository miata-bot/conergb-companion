import {useColorScheme} from 'react-native'

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {useBtService} from './modules/bluetooth/core'
import {ThemeProvider} from '~/modules/theme'
import Controller from '~/screens/controller'
import OnboardingScreen from '~/screens/onboarding'

export type RootStackParamList = {
  Controller: undefined
  Onboarding: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

function App() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Controller" component={Controller} />
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default function AppRoot() {
  useBtService()
  const scheme = useColorScheme()

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NavigationContainer>
  )
}
