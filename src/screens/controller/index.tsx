import {useEffect} from 'react'

import type {StackScreenProps} from '@react-navigation/stack'
import {Flex, useColorModeValue} from 'native-base'

import type {RootStackParamList} from '~/App'

type Props = StackScreenProps<RootStackParamList, 'Controller'>

export default function Controller({navigation}: Props) {
  const bgColor = useColorModeValue('light.50', 'dark.50')

  useEffect(() => {
    navigation.replace('Onboarding')
  }, [navigation])

  return <Flex bgColor={bgColor} flexDirection="column" height="100%" />
}
