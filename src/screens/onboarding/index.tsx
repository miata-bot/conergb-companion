import {createStackNavigator} from '@react-navigation/stack'

import ExplainPermissionsScreen from './ExplainPermissionsScreen'
import PowerOnControllerScreen from './PowerOnControllerScreen'
import ScanScreen from './ScanScreen'

export type OnboardingStackParamList = {
  ExplainPermissions: undefined
  PowerOnController: undefined
  Scan: undefined
}

const OnboardingStack = createStackNavigator<OnboardingStackParamList>()

export default function OnboardingScreen() {
  return (
    <OnboardingStack.Navigator screenOptions={{headerShown: false}}>
      <OnboardingStack.Screen
        name="PowerOnController"
        component={PowerOnControllerScreen}
      />
      <OnboardingStack.Screen
        name="ExplainPermissions"
        component={ExplainPermissionsScreen}
      />
      <OnboardingStack.Screen name="Scan" component={ScanScreen} />
    </OnboardingStack.Navigator>
  )
}
