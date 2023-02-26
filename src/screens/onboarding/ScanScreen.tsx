import {useEffect, useState} from 'react'

import {StackScreenProps} from '@react-navigation/stack'
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
import {useDiscoverPeripherals} from '~/modules/bluetooth/discovery'
import {
  getRequestBtPermissionsFn,
  useGetBtPerms,
} from '~/modules/bluetooth/permissions'

type Props = StackScreenProps<OnboardingStackParamList, 'Scan'>

export default function ScanScreen({navigation}: Props) {
  const [btPermStatus, recheckBtPerms] = useGetBtPerms()
  const [isScanning, setIsScanning] = useState(true)
  const {peripherals} = useDiscoverPeripherals({
    onDiscoveryStop: () => {
      setIsScanning(false)
    },
  })
  const requestBtPermissionsFn = getRequestBtPermissionsFn()

  Object.entries(peripherals).forEach(peripheralEntry => {
    console.log(peripheralEntry[1].advertising.serviceUUIDs)
  })

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
        console.log('starting scan')
        scan(['1811'], 5, true)
      } catch (error) {
        console.error(error)
      }
    }
  }, [btPermStatus, isScanning])

  function getContent() {
    if (peripherals.length === 0) {
      if (isScanning) {
        return (
          <Flex height="100%" justifyContent="center">
            <VStack>
              <Center>
                <Spinner size="lg" />
              </Center>
            </VStack>
          </Flex>
        )
      } else {
        return (
          <>
            <Flex height="100%" justifyContent="center">
              <Center>
                <VStack alignItems="center" space="2">
                  <Icon
                    as={EntypoIcon}
                    name="circle-with-cross"
                    size="20"
                    color="red.500"
                  />
                  <Heading>No devices were found.</Heading>
                  <Text>Try moving closer.</Text>
                </VStack>
              </Center>
            </Flex>
            <Center
              marginBottom="8"
              marginTop="auto"
              paddingX="8"
              safeAreaBottom>
              <Button
                onPress={() => setIsScanning(true)}
                size="lg"
                width="100%">
                Retry
              </Button>
            </Center>
          </>
        )
      }
    } else {
      return (
        <Flex height="100%" alignItems="center" justifyContent="center">
          <Text>Found {peripherals.length} device(s)</Text>
        </Flex>
      )
    }
  }

  return <View>{getContent()}</View>
}
