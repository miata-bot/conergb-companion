import {useContext, useEffect, useState} from 'react'

import {type StackScreenProps} from '@react-navigation/stack'
import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base'
import {scan} from 'react-native-ble-manager'
import {RESULTS} from 'react-native-permissions'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import {OnboardingStackParamList} from '.'
import {ScanningContext} from '~/modules/bluetooth/discovery'
import {
  getRequestBtPermissionsFn,
  useGetBtPerms,
} from '~/modules/bluetooth/permissions'

type Props = StackScreenProps<OnboardingStackParamList, 'Scan'>

export default function ScanScreen({navigation}: Props) {
  const {
    peripheralsState: [peripherals],
    scanningState: [isScanning],
    reset,
  } = useContext(ScanningContext)
  const [btPermStatus, recheckBtPerms] = useGetBtPerms()
  const [navigated, setNavigated] = useState(false)
  const requestBtPermissionsFn = getRequestBtPermissionsFn()

  useEffect(() => {
    if (peripherals.length > 0 && !navigated) {
      navigation.replace('DeviceSelector')
      setNavigated(true)
    }
  }, [peripherals, navigated, navigation])

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
      isScanning &&
      (btPermStatus === RESULTS.GRANTED || btPermStatus === RESULTS.UNAVAILABLE)
    ) {
      try {
        scan(['1811'], 0.5, true)
      } catch (error) {
        console.error(error)
      }
    }
  }, [btPermStatus, isScanning])

  function getContent() {
    if (peripherals.length > 0) return null
    if (isScanning) {
      return (
        <Flex height="100%" justifyContent="center">
          <VStack alignItems="center" space="md">
            <Spinner size="lg" />
            <Heading>Looking for RGB Controllers...</Heading>
          </VStack>
        </Flex>
      )
    } else {
      return (
        <>
          <Flex height="100%" justifyContent="center">
            <Center>
              <VStack alignItems="center" space="sm">
                <Icon
                  as={EntypoIcon}
                  name="circle-with-cross"
                  size="20"
                  color="red.500"
                />
                <Heading>No RGB Controllers were found.</Heading>
                <Text>Try moving closer.</Text>
              </VStack>
            </Center>
          </Flex>
          <Center marginBottom="8" marginTop="auto" paddingX="8" safeAreaBottom>
            <Button onPress={() => reset()} size="lg" width="100%">
              Retry
            </Button>
          </Center>
        </>
      )
    }
  }

  return <View>{getContent()}</View>
}
