import {useEffect} from 'react'
import {Text} from 'react-native'

import type {StackScreenProps} from '@react-navigation/stack'

import type {RootStackParamList} from 'src/App'

type Props = StackScreenProps<RootStackParamList, 'Controller'>

export default function Controller({navigation}: Props) {
  useEffect(() => {
    navigation.replace('Onboarding')
  }, [navigation])

  return <Text>Controller Screen</Text>
}
