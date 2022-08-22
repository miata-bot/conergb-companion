import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {ThemeProvider} from 'src/modules/theme'
import Controller from 'src/screens/controller'
import OnboardingScreen from 'src/screens/onboarding'

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
      <RootStack.Group
        screenOptions={{detachPreviousScreen: true, presentation: 'modal'}}>
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default function AppRoot() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NavigationContainer>
  )
}
