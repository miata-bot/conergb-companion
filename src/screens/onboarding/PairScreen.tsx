import {StackScreenProps} from '@react-navigation/stack'
import {type Peripheral} from 'react-native-ble-manager'

import {OnboardingStackParamList} from '.'

export interface PairScreenParams {
  peripheral: Peripheral
}

export default function PairScreen(
  props: StackScreenProps<OnboardingStackParamList, 'Pair'>,
) {
  console.log(props.route.params.peripheral)
  return null
}
