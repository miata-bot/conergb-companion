import {useEffect} from 'react'

import {StackScreenProps} from '@react-navigation/stack'
import {Center, Flex, Spinner, VStack, useColorModeValue} from 'native-base'
import {RESULTS} from 'react-native-permissions'

import {OnboardingStackParamList} from '.'
import {getRequestBtPermissionsFn} from '~/modules/bt'
import useGetBtPerms from '~/modules/bt/hooks/useGetBtPerms'

type Props = StackScreenProps<OnboardingStackParamList, 'Scan'>

export default function ScanScreen({navigation}: Props) {
  const bgColor = useColorModeValue('light.50', 'dark.50')
  const [btPermStatus, recheckBtPerms] = useGetBtPerms()
  const requestBtPermissionsFn = getRequestBtPermissionsFn()

  useEffect(() => {
    async function requestBtPermissions() {
      await requestBtPermissionsFn()
      recheckBtPerms()
    }

    if (btPermStatus) {
      if (btPermStatus === RESULTS.DENIED) {
        requestBtPermissions()
      }
      if (
        btPermStatus === RESULTS.BLOCKED ||
        btPermStatus === RESULTS.LIMITED
      ) {
        navigation.replace('BtError')
      }
    }
  }, [btPermStatus, navigation, recheckBtPerms, requestBtPermissionsFn])

  useEffect(() => {
    if (
      btPermStatus === RESULTS.GRANTED ||
      btPermStatus === RESULTS.UNAVAILABLE
    ) {
      console.log('scan')
    }
  }, [btPermStatus])

  return (
    <Flex bgColor={bgColor} flexDirection="column" height="100%">
      <Flex height="100%" justifyContent="center">
        <VStack>
          <Center>
            <Spinner size="lg" />
          </Center>
        </VStack>
      </Flex>
    </Flex>
  )
}
