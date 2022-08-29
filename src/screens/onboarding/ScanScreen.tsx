import {useState} from 'react'
import {useEffect} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {CompositeScreenProps} from '@react-navigation/native'
import {StackScreenProps} from '@react-navigation/stack'
import {Center, Flex, Spinner, VStack, useColorModeValue} from 'native-base'
import BleManager, {type Peripheral} from 'react-native-ble-manager'
import {type PermissionStatus, RESULTS} from 'react-native-permissions'

import {OnboardingStackParamList} from '.'
import {RootStackParamList} from 'src/App'
import {
  BleManagerEmitter,
  getCheckBtPermissionsFn,
  getRequestBtPermissionsFn,
} from 'src/modules/bt'
import {BLE_MANAGER} from 'src/modules/bt/constants'
import {STORAGE} from 'src/modules/storage/constants'

type Props = CompositeScreenProps<
  StackScreenProps<OnboardingStackParamList, 'Scan'>,
  StackScreenProps<RootStackParamList>
>

export default function ScanScreen({navigation}: Props) {
  const [btPermStatus, setBtPermStatus] = useState<PermissionStatus>()
  const bgColor = useColorModeValue('light.50', 'dark.50')
  const checkBtPermissionsFn = getCheckBtPermissionsFn()
  const requestBtPermissionsFn = getRequestBtPermissionsFn()
  const [readyToScan, setReadyToScan] = useState(true)

  function discoverPeripheral(peripheral: Peripheral) {
    console.log(peripheral)
  }

  useEffect(() => {
    async function checkBtPermissions() {
      const result = await checkBtPermissionsFn()
      setBtPermStatus(result)
    }
    checkBtPermissions()
  }, [checkBtPermissionsFn])

  // Navigate to bluetooth error screen if we know *for sure*
  // that we are not going to be able to utilize the device's
  // bluetooth functionality.
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

  // Perform scanning if we are reasonably sure that we
  // have the capability to do so. If there is an error,
  // redirect to the bluetooth error screen.
  useEffect(() => {
    if (
      btPermStatus === RESULTS.GRANTED ||
      btPermStatus === RESULTS.UNAVAILABLE
    ) {
      async function scan() {
        // initialize bluetooth if it hasn't already been done so
        const grantedBt = await AsyncStorage.getItem(STORAGE.GRANTED_BLUETOOTH)
        if (!grantedBt) {
          await AsyncStorage.setItem(STORAGE.GRANTED_BLUETOOTH, '1')
          BleManager.start()
        }

        try {
          await BleManager.scan([], 3)
          // setReadyToScan(false)
          BleManagerEmitter.addListener(
            BLE_MANAGER.DISCOVER_PERIPHERAL,
            discoverPeripheral,
          )
        } catch (error) {
          console.log(error)
          navigation.replace('BtError')
        }
      }
      if (readyToScan) scan()
      console.log('scan')
    }
  }, [btPermStatus, navigation, readyToScan])

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
