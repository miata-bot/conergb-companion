import {useEffect} from 'react'
import {useColorScheme} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import BleManager from 'react-native-ble-manager'

import {STORAGE} from './modules/storage/constants'
import {ThemeProvider} from 'src/modules/theme'
import BtErrorScreen from 'src/screens/BtErrorScreen'
import Controller from 'src/screens/controller'
import OnboardingScreen, {
  OnboardingStackParamList,
} from 'src/screens/onboarding'

export type RootStackParamList = {
  Controller: undefined
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>
  BtError: undefined
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
      <RootStack.Screen name="BtError" component={BtErrorScreen} />
    </RootStack.Navigator>
  )
}

export default function AppRoot() {
  const scheme = useColorScheme()

  // Initialize bluetooth if onboarding has already been completed
  useEffect(() => {
    async function initBt() {
      const grantedBt = await AsyncStorage.getItem(STORAGE.GRANTED_BLUETOOTH)
      if (grantedBt) BleManager.start()
    }
    initBt()
  }, [])

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NavigationContainer>
  )
}
