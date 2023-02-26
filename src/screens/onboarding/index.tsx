import {createStackNavigator} from '@react-navigation/stack'

import BtErrorScreen from './BtErrorScreen'
import DeviceSelector from './DeviceSelectorScreen'
import ExplainPermissionsScreen from './ExplainPermissionsScreen'
import PairScreen, {type PairScreenParams} from './PairScreen'
import PowerOnControllerScreen from './PowerOnControllerScreen'
import ScanScreen from './ScanScreen'
import {
  ScanningProvider,
  useDiscoverPeripherals,
} from '~/modules/bluetooth/discovery'

export type OnboardingStackParamList = {
  BtError: undefined
  ExplainPermissions: undefined
  PowerOnController: undefined
  Scan: undefined
  DeviceSelector: undefined
  Pair: PairScreenParams
}

const OnboardingStack = createStackNavigator<OnboardingStackParamList>()

function OnboardingScreen() {
  useDiscoverPeripherals()
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
      <OnboardingStack.Screen name="BtError" component={BtErrorScreen} />

      <OnboardingStack.Screen name="Scan" component={ScanScreen} />
      <OnboardingStack.Screen
        name="DeviceSelector"
        component={DeviceSelector}
      />
      <OnboardingStack.Screen name="Pair" component={PairScreen} />
    </OnboardingStack.Navigator>
  )
}

export default function OnboardingScreenRoot() {
  return (
    <ScanningProvider>
      <OnboardingScreen />
    </ScanningProvider>
  )
}
