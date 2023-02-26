import {useEffect} from 'react'

import {StackScreenProps} from '@react-navigation/stack'
import {Center, Flex, Spinner, VStack} from 'native-base'
import {scan} from 'react-native-ble-manager'
import {RESULTS} from 'react-native-permissions'

import {OnboardingStackParamList} from '.'
import {
  getRequestBtPermissionsFn,
  useGetBtPerms,
} from '~/modules/bluetooth/permissions'
import {useBgColor} from '~/modules/theme'

type Props = StackScreenProps<OnboardingStackParamList, 'Scan'>

export default function ScanScreen({navigation}: Props) {
  const bgColor = useBgColor()
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
