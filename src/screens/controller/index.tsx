import {useEffect} from 'react'

import type {StackScreenProps} from '@react-navigation/stack'
import {View} from 'native-base'

import type {RootStackParamList} from '~/App'

type Props = StackScreenProps<RootStackParamList, 'Controller'>

export default function Controller({navigation}: Props) {
  useEffect(() => {
    navigation.replace('Onboarding')
  }, [navigation])

  return <View />
}
