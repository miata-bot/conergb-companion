import {useEffect} from 'react'

import type {StackScreenProps} from '@react-navigation/stack'
import {Flex} from 'native-base'

import type {RootStackParamList} from '~/App'
import {useBgColor} from '~/modules/theme'

type Props = StackScreenProps<RootStackParamList, 'Controller'>

export default function Controller({navigation}: Props) {
  const bgColor = useBgColor()

  useEffect(() => {
    navigation.replace('Onboarding')
  }, [navigation])

  return <Flex bgColor={bgColor} flexDirection="column" height="100%" />
}
