import {useState} from 'react'
import {useEffect} from 'react'

import {StackScreenProps} from '@react-navigation/stack'
import {Center, Flex, Spinner, VStack, useColorModeValue} from 'native-base'
import {type PermissionStatus, RESULTS} from 'react-native-permissions'

import {OnboardingStackParamList} from '.'
import {getCheckBtPermissionsFn, getRequestBtPermissionsFn} from '~/modules/bt'

type Props = StackScreenProps<OnboardingStackParamList, 'Scan'>

export default function ScanScreen({navigation}: Props) {
  const [btPermStatus, setBtPermStatus] = useState<PermissionStatus>()
  const bgColor = useColorModeValue('light.50', 'dark.50')
  const checkBtPermissionsFn = getCheckBtPermissionsFn()
  const requestBtPermissionsFn = getRequestBtPermissionsFn()

  useEffect(() => {
    async function checkBtPermissions() {
      const result = await checkBtPermissionsFn()
      setBtPermStatus(result)
    }
    checkBtPermissions()
  }, [checkBtPermissionsFn])

  useEffect(() => {
    async function requestBtPermissions() {
      const result = await requestBtPermissionsFn()
      setBtPermStatus(result)
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
  }, [btPermStatus, navigation, requestBtPermissionsFn])

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
